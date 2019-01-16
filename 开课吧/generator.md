# 笔记 8/28 2018



## 1. generator 

async*

-----------------------------------------

Generator -特殊的函数

```js
//生成跌代器|generator对象
//yield 使函数停止 可以传参 可以有返回值
//json和对象的区别 json是一种数据传输格式，是js对象的子集
//用在哪里？
    //等待某些操作结束	
//场景： 先获取banner的数据，做相应的处理，获取完了之后获取banner的侧边栏的数据，做相应的处理

//generator书写方式
function *show(){
    //xxx执行一些操作
    //xxax
    
    let data1=yield $.ajax('a.txt');//操作结束后返回data1
    //xxx
    //xxx
    let data2=yield $.ajax('b.txt');//操作结束后返回data2
    //xxx
    //xxx
    
}
//异步书写方式
$.ajax({url:'data/banner',success(){
    //做一些操作
    //获取banner侧边栏数据
    $.ajax({url:'data/banner-left',success(){
        //做一些操作
    }})
}})
```



```js
cnpm search yield-runner-blue
//引入库
//记得看源码 unfixed
//用写同步的方式写异步代码 unfixed  补全代码
runner(function *(){
    let arr=yield $.ajax('data/1.json');
    console.log(arr);
    let json=yield $.ajax('data/2.json');
    console.log(json)
})
```

官方出了一个官方版的runner

```js
//中间出现了错误，怎么捕获？ unfixed
//async await -> (变成)
* -> async
yeild ->await

async function show(){
    let data1=await $.ajax('a.txt');
    //xxx
    //xxx
    let data2=await $.ajax('b.txt');
    //xxx
    //xxx
}
show();//要手动调用一次

//可以写成自执行的


(async ()=>{
    let data1=await $.ajax('a.txt');
    //xxx
    //xxx
    let data2=await $.ajax('b.txt');
    //xxx
    //xxx
})()

```



Promise本质 ：等待异步操作结束

generator本质： 无感处理异步操作

async本质 ：官方runner

## 2. 模块化

模块-》元件-》组件

1.成熟的模块化解决方案

```js
1. 民间的  sea.js require.js

  	sea.js  bower i seajs
    模块： 定义 调用
    sea--- 按需引用、解决依赖
    //调用
    //在html里面引入模块使用use，js文件中调用使用require
    seajs.use('mod1.js',function(mod1){
        //加载文件使用的是ajax
    })
	//多个模块
    seajs.use(['mod1.js'],function(mod1){
        //加载文件使用的是ajax
        mod1.a;//12
        mod1.b;//5
    })


	//mod1.js
    define(function(require,exports,module){
        //引入其他的模块
        
        //导出
		exports.a=12;
        //module 批量导出
        module.exports={
            a:12,
            b:5,
            show(){
                
            }
        }
    })
    
2. node.js模块化

html->js导入 use 
js-> js之间导入 require
node.js没有use

node.js中 ./必须要加
系统模块 http 
自己写的模块 自己写的模块必须加./,./强制在当前目录下寻找

node的模块化
1. 没有define
2. exports require module
3. 引用自定义模块有两种方式
	1.模块放在node_modules里面，引入时候不用加'./a.js' 直接'a.js'
    2.前面加./
     
创建自己的包
mkdir nmatch
npm init --yes
index.js
module.exports={
    sum(a,b){
        return a+b;
    }
    
}
/nmatch
npm login
npm publish


3. es6模块化

import 
export

```



2. babel(不能编译模块) webpack unfixed 使用babel

   1. 安装babel- cli  command line interface 命令行接口

      Cnpm i babel-cli -g

      babel src -d build   //把src目录编译到build中  这样运行不行，还需要一个.babelrc文件放配置

      //presets 预设 env是预设模式的一种 ，需要安装一下

      cnpm i babel-preset-env -D

      ```json
      {
          "presets":["env"]
      }
      ```

      









##作业

//作业： 写代码

1. 回去看runner代码  yield-runner-blue 
2. CMD AMD 是什么，区别
3. Sea.js require.js 原理
4. 看书 import export unfixed
5. 使用webpack编译es6模块 unfixed





作业1. 

```js
源码没有看懂
```

作业2

[参考文章：掘金](https://juejin.im/post/5aaa37c8f265da23945f365c)

```js
AMD规范采用异步方式加载模块，模块的加载不影响它后面语句的执行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会执行。
代表： require.js
require.config()指定引用路径，define()定义模块，require()加载模块

需要一个入口文件main.js

require.config({
    baseUrl:"js/lib",
    paths:{
        "jquery":"jquery.min", //实际路径为js/lib/jquery.min.js
        "underscore":"underscore.min"
    }
})
//执行基本操作
require(["jquery","underscore"],function($,_){
    //do something
})

//定义模块
define(function(){
    var basicNum=0;
    return {
        basicNum:basicNum
    }
})


CMD和AMD很类似，不同点在于：AMD推崇依赖前置、提前执行，cmd推崇依赖后置，延迟执行。
代表： sea.js
/** AMD写法 **/
define(["a", "b", "c", "d", "e", "f"], function(a, b, c, d, e, f) { 
     // 等于在最前面声明并初始化了要用到的所有模块
    a.doSomething();
    if (false) {
        // 即便没用到某个模块 b，但 b 还是提前执行了
        b.doSomething()
    } 
});

/** CMD写法 **/
define(function(require, exports, module) {
    var a = require('./a'); //在需要时申明
    a.doSomething();
    if (false) {
        var b = require('./b');
        b.doSomething();
    }
});

```



作业3 unfixed

sea.js原理





