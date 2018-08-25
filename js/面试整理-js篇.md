# 面试整理-js篇

##  原型 原型链 基于原型的javascript对象系统       

在以类为中心的编程语言中，类和对象的关系可以想象成模子和产品的关系，对象总是从类中创建而来。而在原型编程的思想中，类不是必须的，对象未必要从类中创建而来，一个对象是通过克隆另外一个对象所得到的。假如A对象是从B对象克隆来的，那么B对象就是A对象的原型。假如有一个根对象Object,Animal对象是从Object对象克隆得到的，Dog对象是从Animal对象上克隆得到的，那么Object是Animal的原型，Animal是Dog的原型，这样就构成了一条原型链。原型链是很有作用的，当我们调用Dog的某个方法，但是它本身没有这个方法，它就会把这个请求顺着原型链委托到上一层，如果找到了方法就进行调用，如果没有找到继续向上直到根对象。

javascript的对象系统就是基于原型构建的，原型编程有以下规则：

* 所有的数据都是对象
* 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它
* 对象会记住它的原型
* 如果对象无法响应某个请求，它会把这个请求委托给自己的原型

下面一一讲述每个规则

#### 1. 所有数据都是对象。

在javascript中，除了undefined，其他所有的数据都是对象。既然对象是通过克隆得来的，那么肯定有一个根对象，其他的对象都源于这个根对象。在javascript中，根对象是Object.prototype。Object.prototype是一个空对象，我们看到的其他对象，都是起源于Object.prototype.

```js
var obj1={};
var obj2=new Object();
//可以利用es5的Object.getPrototype来查看这两个对象的原型
console.log(Object.getPrototype(obj1) === Object.prototype);// 输出 :true
console.log(Object.getPrototype(obj2) === Object.prototype);// 输出 :true
```



####2.要想得到一个对象，不是通过实例化类，而是找到一个对象作为原型克隆它 

在javascrpt中，我们不需要关心克隆的细节，因为这是引擎内部实现的。我们要做的只是显式地调用var obj1=new Object()或者var obj2={}。此时，引擎内部就会从Object.prototype上克隆一个对象并且返回给我们。

接下来看如何使用new得到一个对象

```js
function Person(name){
    this.name=name;
};
Person.prototype.getName=function(){
    return this.name;
};
var a=new Person('Jack');
console.log(a.name);// Jack
console.log(a.getName()) //Jack
console.log(Object.getPrototype(a)===Person.prototype);//true
```

在这里Person不是类，而是函数构造器。javascript中的函数可以作为普通函数调用，也可以当做函数构造器调用。当使用new调用时，此时的函数就是一个函数构造器。用new调用函数的过程实际上也是克隆Object.prototype对象，再进行一些其他额外操作的过程。

在chrome和firfox等对外暴露了\__proto__属性的浏览器中，我们可以这样来理解new过程

```js
function Person(name){
    this.name=name;
};
Person.prototype.getName=function(){
    return this.name;
};
var objectFactory=function(){
    var obj=new Object(),//从Object.prototype上面克隆一个对象
        Constructor=[].shift.call(arguments);//获取从外部传入的构造器，此例是Person
    obj.__proto__=Constructor.prototype;//指向正确的原型
    var ret=Constructor.apply(obj,arguments);//用外部构造器传入的值为obj设置属性
    return typeof ret === 'object'? ret : obj;//确保构造器总是会返回一个对象
}
var a=objectFactory(Person,'Jack');
console.log(a.name);//Jack
console.log(Object.getPrototype(a)===Person.prototype);//ture
```

#### 3.对象会记住它们的原型

如果请求可以在原型链中向后传递，那么每个节点都必须知道它的下一个节点。同理，每个对象必须记住自己的原型。

Javascript 给对象提供了一个名为\__proto__的属性，某个对象的\__proto__默认会指向它的构造器的原型对象，即{Constructor}.prototype。下面来验证

```js
var a=new Object();
console.log(a.__proto__===Object.prototype);//ture
```

所以,\__proto__属性就是对象跟它的原型联系起来的纽带，对象通过\__proto__属性记住它的原型

#### 4. 如果对象无法响应某个请求，它会把这个请求委托给它的构造器的原型

这条规则是原型继承的精髓所在。

## 闭包

## 作用域

##  如何拷贝一个对象，浅拷贝，深拷贝

[github](https://github.com/wengjq/Blog/issues/3)

浅拷贝和深拷贝是针对于数组和Object等复杂的对象来说的，假如一个对象中嵌套对象的情况下，浅拷贝只复制了一层对象的属性，而深拷贝则递归复制所有嵌套对象的属性。 

## vue双向绑定如何实现

##  vuex的触发过程

##  性能优化，哪些优化的收益较大

## js事件模型，事件委托的概念

## == 和===的区别

（==）相等在比较时会进行类型转换，(===)不会

相等类型转化情况

| 情况 | 转化成 |
| ------------------------ | ---------------------------- |
| 一个字符串，一个数值     | 数值                        |
| 有一个操作数是布尔值 | 转化为数值 true 1 false 0 |
| 一个操作数是对象，另一个不是 | 调用对象的valueOf()方法，得到基本类型后按照前面的规则进行比较 |

特殊情况

| 表达式          | 值    |
| --------------- | ----- |
| null==undefined | true  |
| NaN==NaN        | false |
| false==0        | true  |
| true==1         | True  |
| true==2         | false |
| undefined==0    | False |
| null==0         | false |
| '5'==5          | true  |
|                 |       |





































