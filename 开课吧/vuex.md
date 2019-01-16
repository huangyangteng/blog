#vuex

Vue:observe

1. 核心：监听数据的改变

Proxy

1. get
2. set
3. deleteProerty
4. has        in操作

```js
let json={};
//proxy p是一个代理
let p=new Proxy(json,{
    get(target,key,proxy){//三个参数
        alert('有人来获取东西了')
    },
    set(target,key,value,proxy){
        alert('有人设置东西了')
    },
    has(target,key){
        
    },
    deleteProperty(target,key){
        
    }
})


```



vue就是个proxy

proxy兼容低版本浏览器

1. 观察者—浏览器原生支持 不兼容
2. 脏检查 每次修改数据之后，与原来的做一下对比  全浏览器支持 angular v1.x

首先对象复制一份，然后做对比      //修改 增加 删除

需要不停的检查，如果json过大，性能不行

```js
var json={
    a:12,
    b:5
}
var _old_json={};
//首先复制一份
for(var name in json){
    _old_json[name]=json[name];
}
//然后检测变化
for(var name in _old_json){
    if(!json[name]){
        console.log('删除了'+name)
    }else if(_old_json[name]!=json[name]){
        修改了
     }
}
for(var name in json){
    if(!old_json[name]){//原来的里面有，现在的没有
        //新增了
    }
}
```

---

##Vuex

###1. 作用：-状态统一管理

数据统一：

1. 组件中-同步、通信
2. 数据交互

### 2.概念

1. State 状态 全局统一
2. Getter   获取状态
3. mutation 名词 用来修改状态
4. action 提交mutation

```js
import Vuex from 'vuex'
Vue.use(Vuex);
//1. 创建存储对象
const store=new Vuex.Store({
    strict:true,//严格模式，只能由mutation修改状态
    state:{
        count:0
    },
    mutations:{
        addCount(state,arg){
            state.count++;
        },
        minusCount(state,arg){
            state.count--;
        }
    },
    actions:{
        addCount({commit},arg){
            console.log(store);
            commit('addCount',arg)
        }
    },
    getters:{
        
    }
})
//2. 注册到vue身上
new Vue({
    store
})
//3. 使用 在组件里面使用
//触发action
this.$store.dispatch('action名字',参数)  dispatch -> action commit ->mutation state.xx ->state                       
```



```js
//store.js
import Vue from 'Vue'
import Vuex from 'Vuex'
export default new Vuex.Store({
    strict:true,//严格模式，只能由mutation修改状态
    state:{
        count:0
    },
    mutations:{
        addCount(state,arg){
            state.count++;
        },
        minusCount(state,arg){
            state.count--;
        }
    },
    actions:{
        addCount({commit},arg){
            console.log(store);
            commit('addCount',arg)
        }
    },
    getters:{
        
    }
})

//main.js

import store from 'store.js'
new Vue({
    store
})

```



数据交互  getter

//服务器端 koa

```js
const koa=require('koa');
const router=require('koa-route');

let server=new koa();
server.listen(8081);

server.use(async (ctx,next)=>{
    ctx.set('Access-control-Allow-Origin','*');
})
let r=router();
r.get('/a',async ctx=>{
    ctx.body=[12,4,5,6];
})

server.use(r.routes())
```



//store.js

```js
export default new Vuex.Store({
    strict:true,//严格模式，只能由mutation修改状态
    state:{
        arr:[]
    },
    mutations:{
        setArr(state,arg){
            store.arr=arg //数据放在data里面不行 ，要放在computed里面
            //arg.forEach(a=>{
            //    state.arr.push(a)
            //})
        }
    },
    actions:{
       async loadArr({commit},arg){
        await(await fetch("http://localhost:8080/a")).json()
           console.log(arr);
           commit('setArr',arr);
        }
    },
    getters:{
        
    }
})


```

list.vue

```js
<template>
	    
</template>
export default{
    data(){
        return {
           items:[],//items放在data里面不能更新
        }
    },
    computed:{
        items:this.$store.state.arr 	
    },
    async mounted(){
        this.$store.dispatch('loadArr')
    }
}
```

上面问题：必须主动触发  loadArr这个action 在list.vue中  

//改进版 获取数据放在getter里面

```js
export default new Vuex.Store({
    state:{
        arr:[]
    },
    mutations:{
         setArr(state,arg){
            store.arr=arg //数据放在data里面不行 ，要放在computed里面
        }
    },
    actions:{
        async loadArr({commit},arg){
            let arr=await(await fetch('http://localhost:8081/a')).json();
            commit('setArr',arr);
        }
    },
    getters:{//this.$store.getters.a
 
        arr(state){
            if(state.arr.length==0){
                store.dispatch('loadArr');
            }
            return state.arr;
        }
    }
    
})
```

//list.vue

```vue
<template>
	<div>
    	{{a}}
    </div>	    
</template>
<script>
export default{
    data(){
        return {
        }
    },
    computed:{
        items(){
            return this.$store.getters.s 	
        }
        
    },
    async mounted(){
        this.$store.dispatch('loadArr')
    }
}
</script>
```





手动触发action  适合异步

使用getters       适合同步

结论：

数据交互：getter

其他异步操作  action

---

###使用vuex











