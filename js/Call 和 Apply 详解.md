

# call和apply详解

[TOC]

ECMAScript3给Function的原型定义了两个方法,它们分别是Function.prototype.call和Function.prototype.apply。

## 1. call和apply的区别



二者的区别在于传入参数的不同。

* apply(thisObj,[arg1,arg2,arg2...]);
* call(thisObj,arg1,arg2,arg3...)



apply接受两个参数，第一个参数指定了函数体内this对象的指向，第二个参数为一个带下标的集合，这个集合可以为数组，可以为类数组，apply方法把这个集合中的元素传递给调用apply方法的函数

```js

let func=function(a,b,c){

 	console.log([a,b,c]);//输出[1，2，3]
 	
}
func.apply(null,[1,2,3]);   //在这段代码中,[1,2,3]对应参数[a,b,c],他们作为apply方法的第二个参数传入func函数中    
```




call传入的参数数量不固定，跟apply相同，第一个参数代表函数体内this的指向，从第二个参数开始，每个参数依次传入函数

```js
let func=function(a,b,c){

	console.log([a,b,c]);//输出[1,2,3]

}

func.call(1,2,3);

```



当我们调用apply或者call时，如果我们传入的第一个参数为null，函数体内的this会指向默认的宿主对象，在浏览器中是window,如果是在严格模式下，函数体内的this还是为null.

我们使用call和apply有时候不是为了改变this指向，而是为了借用其他对象的方法。

```js
    例如    Math.max.apply(null,[1,2,3,5,9]); //返回值：9

    //Math.max()方法用于确定一组数中的最大值，可以接受任意个数值参数,不可以传入数组作为参数

    Math.max(2,4,5)//返回值：5

    Math.max.apply()方法，把数组[1,2,3,5,9]作为Math.max的参数传入，返回值为9

```



## 2 call和apply的用途



### 2.1 改变this指向



​    在实际开发中，经常遇到this指向被不经意改变的场景，比如有一个div节点，div节点的onclick事件的this本来是指向这个div节点的

```Js
	document.getElementById('div1').onclick=function(){

        console.log(this.id);//输出:div1

    }
```


假如该事件函数中有一个func,在事件内部调用func时，func体内的this就指向了wndow,而不是我们期望的div

```Js
    document.getElementById('div1').onclick=function(){

        let func=function () {

            console.log(this.id);//输出undefined  因为window中没有定义id属性

        }

        func();

    }
```
这时候我们可以用call来修正func函数体内的this,使其依然指向div

记住call的第一个参数决定了func体内的this指向

```Js
    document.getElementById('div1').onclick=function(){

        let func=function () {

            console.log(this.id);//输出div1

        }

        func.call(this);

    }



	
```



### 2.2 Function.prototype.bind()



bind()方法，用来指定函数内部的this指向，传入一个对象，把对象的this绑定到调用bind方法的函数上，然后返回一个新函数

​    举例子

```Js
function foo(sm){
    console.log(this.a+sm);
    return this.a+sm;
}
let obj={
    a:2
};
let bar=foo.bind(obj);
console.log(bar);
//输出：
// ƒ foo(sm){
//     console.log(this.a + sm);
//     return this.a + sm; 此时的this指向obj,this.a就是obj.a，也就是2
// }
let b=bar(3);//this.a=2 sm=3
console.log(b);//输出 5
//bind()方法把foo()函数的this绑定到obj上，然后返回新的foo函数
```

现在来模拟一个简化版的Function.prototype.bind

```js
Function.prototype.bind=function (context) {
    let self=this;//保存原函数
    return function () {
        return self.apply(context,arguments);//执行新的函数时，会把之前传入的context当做新函数体内的this
    }

};
let obj={
    name:'jack'
}
let func=function () {
    console.log(this.name);//输出 jack
}.bind(obj);
func();
```

我们通过Function.prototype.bind()来包装func函数，使它的this指向obj

接下来实现一个复杂的bind，可以在func中传入一些额外的参数

```js
// 获取传入的对象，把this指向它
// 获取传入的其他参数，和调用func传入的参数一起传递给原函数
Function.prototype.bind=function () {
    let self=this,//保存原函数
        context=[].shift.call(arguments),//获得并移除传入的第一个参数，也就是this的指向
        args=[].slice.call(arguments);//把其他的参数转为数组
    return function () {
        return self.apply(context,[].concat.call(args,[].slice.call(arguments)));
    }

}

let obj={
    name:'sven'
}
let func=function (a,b,c,d) {
    console.log(this.name);
    console.log([a,b,c,d]);
}.bind(obj,1,2);
func(3,4);

```

可以使用es6的展开符号(...)简化上面的bind()方法

```js
Function.prototype.bind=function () {
    let self=this,//保存原函数
        context=[].shift.call(arguments),//获得并移除传入的第一个参数，也就是this的指向
        args=[...arguments];//把其他的参数转为数组
    return function () {
        return self.apply(context,[...args,...arguments]);
    }

}
```



   ### 2.3 借用其他对象的方法

> 猫吃鱼，狗吃肉，奥特曼打小怪兽。如果有一天猫想吃肉，就要借用狗吃肉的方法 狗.吃肉.call(猫，肉); 猫就吃到肉了

> 猫如果想打小怪兽   奥特曼.打小怪兽.call(猫，小怪兽)              

看的知乎上面的一个理解方法

借用一般有两种场景，

* 第一种是"借用构造函数"，通过这种方式，可以实现一些类似继承的效果

```js
let A=function(name){
    this.name=name;
}
let B=function(){
    A.apply(this,arguments);//B调用了A函数，传入参数，并获得了name属性
}
B.prototype.getName=function(){
    return this.name;
}
let b= new B('sven');
console.log(b.getName());  //输出'sven'
```

* 第二种场景是类数组调用数组的方法，或者转化为数组

```js
//类数组调用push方法
(function(){
    Array.prototype.push.call(arguments,3);
    console.log(arguments);//输出 1，2，3
}(1,2,3));
//把类数组转化为数组

(function(){
    let arr=Array.prototype.slice.call(arguments);
    console.log(arr);//输出 [1，2，3]
}(1,2,3));
```



> javascript设计模式与开发实践笔记

