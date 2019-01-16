#笔试2018-9-19 vue

>
>
>vue基础
>
>vue-router
>
>Component 通信、状态管理
>
>Vue-cli

---

双向绑定：数据和视图之间同步变化

单向绑定：数据变了，视图要变 视图变了，数据不变 微信小程序

---

虚拟DOM  需要标识，不给性能会降低

循环问题：需要一个v-key



---

指令

1. {{}}    转义输出（会把html标签显示出来）防止xss
2. V-html           不转义
3. :title        属性
4. @click    事件
   1. 修饰符     @submit.prevent  

computed       同步的 简单、可缓存

```js
computed:{
    a(){//简写   //getter
        return 555
    },
    //完整
        a:{
            get(){
                
            },
            set(){

            }
        }
}
```



监听    

当数据变化的时候，有通知      适合异步的操作

```js
watch:{
    a(newVal,oldVal){
        
    }
}
```



v-if

删除插入dom元素    

v-show

显示/隐藏  display

动画效果

```html
<transition name="fade">
    <div v-if="show">
        
    </div>
</transition>
```



V-for array json string number

:key="item.id"  为了提高性能，需要一个key属性

```js
v-for="item,index in arr" :key='id'
```



v-cloak       

这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 `[v-cloak] { display: none }` 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕

```html
<li v-clock></li>
```



---

优化

1. v-once
2. v-pre

---

Vue-router

1. 引入vue-router
2. 声明一个路由
3. 调用这个路由

```js
let r1=new VueRouter({
    routes:[//路径（url），显示什么东西
//        {path,component}
        {path:'/user',component:{template:'<div>用户列表</div>'}},
        {path:'/ ',component:{template:'<div>文章列表</div>'}},
    ]
});
let vm=new Vue({
    el:'#div1',
    router:r1
})

```

```html
//往哪里渲染
//<a href='#/user'>用户</a>
<router-link to="/user">用户</router-link>//和a标签一样使用
<router-view></router-view>
```

####router-link标签可以很方便地加样式 router-link-active是自带的样式

####程序切换路由

this.$router 对r1的引用 

this.$router.go(-1) 后退       =window.history.go(-1)

this.$router.go(1)  前进

this.$router.push('/user') 直接跳转         =router-line to

####路由参数

```js
$route.parmas.id  //注意不要写错   不是$router  是route
//声明的时候带上参数
{path:'/user/:id',component:{template:'<div>用户id {{$route.params.id}}</div>'}},
```

#### 监听路由跳转，阻止路由跳转

1. watch  不推荐
2. 在component里面加上  beforRouteUpdate(newVal,oldVal){路由变化之前}

```js
watch:{
    '$route'(to,from,next){
        //newVal  新路径
    }
}
```

```js
//写在路由配置里
{
    path:'/user/:id',
        component:{
            template:'<div>当前用户id:{{$route.params.id}}</div>',
                beforeRouteUpdate(to,form,next){//跳转到哪里 从哪里 
                	//只有调用了Next()方法，才会进行跳转
                	next()
            }
        }
   	
}

```

总结：路由就是一个锚点，根据锚点信息，确定要显示哪个组件

#### 路由嵌套

```js
{
    path:'/user/:id',
        component:{
            template:'<div>当前用户id:{{$route.params.id}}</div>',
            children:[
                {
                    path:'info',
                    component:{template:'<div></div>'}
                }
            ]
        }
   	
}
```

####总结：

路由对象

1. path  路径
2. Component 路由主体
3. children 子路由
   1. *路径的写法 前面不要加/

####命名路由        ???

1. :to={name,path,params,query}

#### 命名视图(多视图) 一个路由里面多个视图 ???

Router-view 

一个路由匹配多个组件 banner通用侧边栏通用

```html
<router-view></router-view>
<router-view name='a'></router-view>
<router-view name='b'></router-view>
```

```js
routes:[
    {
        path:'/user',
        components:{
            default：{template:'<div>用户</div>'}，
        	a:{template:'<div>文章</div>'}
    		b:{template:'<div>留言</div>'}
        }
    }
]
```

### 组件

组件=html+css+js  独立的小型页面

两种写法

1. vue1.x写法

2. vue2.x写法

全局组件

```js
//1.声明组件/注册组件
Vue.component('cmp-blue',{template:'<div>aaaaaaaaaaaa</div>'});

```

```html
//2.使用组件
<cmp-blue></cmp-blue>
```

局部组件 属于某个vue实例

```js
//1.声明组件
new Vue({
    components:{
        'cmp-blue':{template:'<div>aaaaaaaaaaaa</div>'}
})
//2.使用组件
<cmp-blue></cmp-blue>
```

组件带参数

父子组件通信

跨组件通信



---

预习：

1. 组件的属性 props

2. 组件的refs

3. 组件的事件 on emit

4. 组件通信

   1. 父子
   2. 跨组件


