# history对象详解及单页面路由实现

> history对象保存着用户的上网记录，从浏览器窗口打开的那一刻算起。出于安全的考虑，开发人员无法得知用户浏览过的URL。不过，借由用户访问过的页面列表，同样可以在不知道实际URL的情况下实现后退与前进

##一、history对象的方法

### ```go(Stirng|number)```

使用go方法可以在用户的历史记录中任意跳转，可以向后也可以向前。这个方法接受一个参数，表示向后或向前跳转的页面数的一个整数值。负数表示向后跳转(类似浏览器的后退按钮)，正数表示向前跳转(类似浏览器的前进按钮)。来看下例子

```js
//后退一页
history.go(-1)

//前进一页
history.go(1)

//前进两页
history.go(2)

```

也可以给go()方法船体一个字符串参数，此时浏览器会跳转到历史记录中包含改字符串的第一个位置，可能后退也可能前进，具体要看哪一个位置最近。如果历史记录中不包含该字符串，则什么都不做。例如：

```js
//跳转到最近的wrox.com页面
history.go("wrox.com")

//跳转到最近的douban.cn页面
history.go("douban.cn")
```



###```back()```和```forward```

这两个方法可以来代替go()，模仿浏览器的后退和前进功能

back()相当于 go(-1)   后退一个页面

forward相当于go(1)   前进一个页面



**注：接下来几个方法是html5新增的方法**

## 二、html5中history新增的方法

###```pushState(state,title,url)```

该方法的作用是 在历史记录中新增一条记录，改变浏览器地址栏的url,**但是，不刷新页面**。

pushState对象接受三个参数，

* `state`：一个与添加的记录相关联的状态对象，主要用于`popstate`事件。该事件触发时，该对象会传入回调函数。也就是说，浏览器会将这个对象序列化以后保留在本地，重新载入这个页面的时候，可以拿到这个对象。如果不需要这个对象，此处可以填`null`。
* `title`：新页面的标题。但是，现在所有浏览器都忽视这个参数，所以这里可以填空字符串。
* `url`：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。

举个例子，假设当前网址是hello.com/1.html,使用puchState()方法在浏览记录中添加一个新纪录

```js
var stateObj={foo:'bar'}
history.pushState(starteObj,'','2.html')
```

添加新纪录后，浏览器的地址栏立刻显示````hello.com/2.html```,但不会跳转到2.html,也不会检查2.html是否存在，它只是成为浏览历史中的最新记录。

总之，pushState()方法不会触发页面刷新，只是导致history对象发生变化，地址栏会有反应，使用该方法后，就可以使用history.state属性读出状态对象

```js
var stateObj={foo:'bar'}
history.pushState(starteObj,'','2.html')
history.state //=> {foo:"bar"}
```

注意：如果pushState的URL参数设置了一个新的hash值，并不会触发hashchange事件。



###```replaceState(state,title,url)```

replaceState方法的作用是替换当前的历史记录，其他的都与pushState()方法一模一样。

假定当前网页是`example.com/example.html`。

```js
history.pushState({page: 1}, 'title 1', '?page=1')
// URL 显示为 http://example.com/example.html?page=1

history.pushState({page: 2}, 'title 2', '?page=2');
// URL 显示为 http://example.com/example.html?page=2

history.replaceState({page: 3}, 'title 3', '?page=3');
// URL 显示为 http://example.com/example.html?page=3

history.back()
// URL 显示为 http://example.com/example.html?page=1

history.back()
// URL 显示为 http://example.com/example.html

history.go(2)
// URL 显示为 http://example.com/example.html?page=3
```

##三、popstate事件

> popstate事件是```window```对象上的事件，配合pushState()和replaceState()方法使用。当```同一个文档```(可以理解为同一个网页，不能跳转，跳转了就不是同一个网页了)的浏览历史出现变化时，就会触发popstate事件。

上面我们说过，调用```pushState()```或者```replaceState()```方法都会改变当前的历史记录，仅仅调用`pushState()`方法或`replaceState()`方法 ，并不会触发该事件，另外一个条件是用户必须点击浏览器的倒退按钮或者前进按钮，或者使用js调用history.back()或者history.forward()等方法。

所以，记住popstate事件触发的条件

```js
1. 处在同一个文档(同一个html页面)
2. 文档的浏览历史(即history对象)发生改变
```

只要符合这两个条件，popstate事件就会触发

具体例子

```html
//index.html
<head>
    <script>
        window.onpopstate=function(){
            alert('location '+document.location+',state '+JSON.stringify(event.state))
        }
    </script>
</head>
<body>
    <!--第二步 -->
	<button onclick="window.history.back()">后退</button>
    <button onclick="window.history.forward()">前进</button>
    <!--第一步 -->
    <button onclick="window.history.pushState(null,'','1.html')">pushState</button>    
</body>


```

先点击pushState按钮，在点击后退按钮，就会触发popstate事件

再来一个例子

```html
//index.html
<head>
    <script>
        window.onpopstate=function(){
            alert('location '+document.location+',state '+JSON.stringify(event.state))
        }
    </script>
</head>
<body>
    <a href="#one">#one</a>   
</body>


```

直接点击```a```标签,也可以触发popstate事件

## 四、浏览器兼容性

图片来自mdn[传送门](https://developer.mozilla.org/en-US/docs/Web/API/History)

![image-20190219150537866](https://ws3.sinaimg.cn/large/006tKfTcgy1g0bqxlo1edj31aa0siam4.jpg)

## 五、单页面路由原理

> 前端路由的本质是监听 URL 的变化，然后匹配路由规则，显示相应的页面，并且无须刷新。

目前单页面使用的路由就只有两种实现方式

* hash模式
* history模式 

###hash模式

www.test.com/##/就是Hash URL,当```##```后面的哈希值发生变化时，不会向服务器请求数据，可以通过hashchange事件来监听到URL的变化，从而进行跳转页面

网上偷来的一张图：

![hash](https://ws1.sinaimg.cn/large/006tKfTcgy1g0cxkrq23gj30q60dpmxy.jpg)

### history模式

history模式相比hash模式更美观，需要用到Html5新增的几个api实现，原理如下：

继续偷图：

![history](https://ws3.sinaimg.cn/large/006tKfTcgy1g0cxnqyelij30yk0g975m.jpg)

## 五、实例，使用history api实现简单的单页面路由



在介绍实例前先介绍下location对象，location对象提供了与当前窗口中加载的文档有关的信息。它包含以下属性：

| 属性名   | 例子                 | 说明                                      |
| -------- | -------------------- | ----------------------------------------- |
| host     | www.hello.com:8080   | 返回服务器名称和端口号(如果有的话)        |
| hostname | www.hello.com        | 返回服务器名称，不带端口号                |
| href     | http://www.hello.com | 返回当前加载页面的完整url                 |
| pathname | /user/ming           | 返回url中的目录                           |
| hash     | #content             | 返回url中的hash,如果没有返回空字符串      |
| search   | ?q=javascript        | 返回Url的查询字符串，这个字符串以问号开头 |

我们在下方的示例中需要用到```pathname```属性拿到访问的路径



一个简单的history模式单页面路由实现如下：



```js
//1. 路由规则
const routes={
    '/user':user, //user是引入的视图   import user from './view/user' 
    '/about':about
}
//2. 路由控制类
class Router {
  start() {
    // 点击浏览器后退/前进按钮时会触发window.onpopstate事件, 我们在这时切换到相应页面
    // https://developer.mozilla.org/en-US/docs/Web/Events/popstate
    window.addEventListener('popstate', () => {
      this.load(location.pathname)
    })

    // 打开页面时加载当前页面 在单页面入口文件中要调用start方法
    this.load(location.pathname)
  }

  // 前往path, 变更地址栏URL, 并加载相应页面
  go(path) {
    // 变更地址栏URL
    history.pushState({}, '', path)
    // 加载页面
    this.load(path)
  }

  // 加载path路径的页面
  load(path) {
    // 首页
    if (path === '/') path = '/foo'
    // 创建页面实例
    const view = new routes[path]()
    // 调用页面方法, 把页面加载到document.body中
    view.mount(document.body)
  }
}
```



Router类的作用是控制页面根据当前Url切换

* start()   
  * 作用1： 监听onpopstate事件，在浏览器前进或后退时加载相应的页面 
  * 作用2： 打开页面时加载当前页面,需要在单页面的入口文件引入，并执行
* go(path) 
  * 跳转到path对应的页面
* load(path)
  * 加载path路径的页面 











##参考链接

* 高程三 p215(history对象) p207(location对象)
* [JavaScript标准参考教程-阮一峰](https://javascript.ruanyifeng.com/bom/history.html#toc4)
* [interviewMap](https://yuchengkai.cn/docs/frontend/framework.html#%E8%B7%AF%E7%94%B1%E5%8E%9F%E7%90%86)