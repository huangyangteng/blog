#MVVM+Vue

##Vue实现三要素

* 响应式：数据双向绑定，数据改变，视图更新
* 模板引擎：模板的解析，指令如何处理
* 渲染：模板如何渲染成html,以及渲染过程

### 一、响应式的实现

Object.defineProperty

```html
<div id="app">
    {{name}}
    {{age}}
</div>
```



```js
var vm=new Vue({
    el:'#app',
    data:{
        name:'zhangsan',
        age:20
    }
})
//数据改变
//vm.name ??  vm.data.name 怎么代理过去的？
//vm.data
```

```java
var obj={
    name:'zhangsan',
    age:25
}
console.log(obj.name)  //获取属性的时候，如何监听到
obj.age=26				//赋值属性的时候，如何监听到
//-----------------------------------------------------------------------
	var obj={};
	
    Object.defineProperty(obj,'name'{
        get(){
            return name;
        }
        set(newVal){
            name=newVal;
        }
    })
    console.log(obj.name)//可以监听到
    obj.name='lisi' //可以监听到
```

```js
var vm={}
var data={
    name:'zhangsan',
    price:100
}
var key,value;
for(key in data){
    (function(key){
          Object.defineProperty(vm,key,{
            get(){
                return data[key];
            }
            set(newVal){
                data[key]=newVal;
            }
        })  
    })(key)
}

```



### vue中如何解析模板

```js

```



