#笔记2018-8-30  需要复习

## 答疑

1.  Mdn 官方文档 
2.  js原生组件怎么写 
3. promise的本质是什么

---

seajs requirejs如何实现的  原理解析

库原理： 核心代码

```js
//自己练习，思考

1. 在js文件里(模块里)
define(function(reuire,exports,module){
    require('2.js')//   <难点
    exports.a=12;
    exports.b=5;
})
2. 在html文件里
seajs.use('lib/1.js',function(mod){
    
})

//实现命名空间  my_sea.js

const sea={
    use(path,fn_end){
        //读取文件内容
        $.ajax({
            url:path,
            seccess(str){
                //自定define函数
                function define(fn){
                    //require()是一个函数
                    let module={
                        exports:{}
                    }
                    //执行fn
                    fn(function(){},module.exports.module);
                }
                
                eval(str);
                
                
            }
        })
        
        
        
        
    }
}


-------------------------------------------------------------
软编译 
let mod2=require('mod2.js');

第一步，找出所有的require的文件
第二步 执行代码




```





---



generator的本质

语法糖  将来会被编译成另外一个东西



promise的本质是什么  回调函数 状态机

1. 当状态改变时—调用之前挂起的then队列
2. then的时候，直接执行对应的函数，给出参数

```js
let p =new Promise(function(resolve,reject){
    
    setTimeout(function(){
        resolve(12)
    },500)
})

p.then(res=>{
    console.log(res)
},err=>{
    console.log(err)
})



class Promise2{
    constructor(fn){
        fn()
    }
    then(){
        
    }
}
```









## 作业 

1. Sea.js原理
2. 不要停留在理论阶段，把学会的东西落实到代码上
3. 