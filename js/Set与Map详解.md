# Set 与Map详解



> 《深入理解es6》 第七章

[TOC]

问题：

数组那么好用，为什么要使用Map和Set集合?

set集合和map集合分别有什么应用?

## 一 简介：



Set是一种无重复元素的列表。开发者不会像遍历数组一样遍历Set集合，而是用于检验集合中的某个值是否存在。

Map集合内含多种键值对，集合中的每个元素分别存放着可访问的键名和值，经常用于缓存频繁取用的数据。



##二 ECMAScript5中的Set与Map集合

在ECMAScript5中，开发者使用对象属性来模拟这两种集合，就像这样

```js
var set=Object.create(null);

set.foo=true;

//检测属性是否存在
if(set.foo){
    //要执行的代码
}
```

> Object.create() 方法，用于原型式继承。接受两个参数，一个用作新对象原型的对象和（可选的）一个为新对象定义额外的属性。返回一个设置好原型的新对象。                                          —高程三 p.170

这段代码中set是一个原型为null的对象，不继承任何属性。

下面是map集合的模拟

```js
var map=Object.create(null);
map.foo='bar';
//获取已存值
var value=map.foo;
console.log(value);   //输出 'bar'
```

这段代码将'bar'储存在map.foo中。

一般来说，Set用于检查对象中是否存在某个键名，Map用于获取已存信息。

### 该解决方案的一些问题

1. 所有对象的属性名都是字符串，就是说 map[5]会转化为map['5']
2. 键不可以为对象，因为对象会转化为[object Object]

##三 ECMAScript6中的Set集合

Set类型是一种有序列表，其中包含一些相互独立的非重复值，通过Set集合可以快速访问其中的数据，更有效地追踪各种离散值。

### 1 创建set集合并添加元素

调用new Set()可以创建Set集合，调用add()添加元素，访问size属性可以获取集合中当前元素的数量

```js
let set=new Set();
set.add(5);
set.add('5');

console.log(set.size);  //2
```

在Set集合中不会对所存值进行强制类型转换，引擎内部使用Objec.is()方法检测两个值是否一致。

> Objec.is(value1,value2);  
>
> 用于判断两个值是否相同
>
> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is

所以，如果向Set集合中添加多个对象，那么它们的值可以相互独立，因此<u>可用于为对象添加额外属性</u>。



多次调用add()方法并传入相同的值，后续的调用会被忽略。

```js
let set=new Set();
set.add(5);
set.add(5);//重复，此次调用会被忽略

console.log(set.size);  //1
```



可以用数组来初始化Set集合,数组中的重复数组会被过滤掉

```js
let arr=[1,2,3,3,4];
let set=new Set(arr);
console.log(set.size);//4  数组中重复元素被去除
```

这个特性可以用来去除数组中重复的元素

```js
let arr=[1,2,3,3,4];
let set=new Set(arr);//去除重复元素
arr=[...set];
console.log(arr);//[1,2,3,4]
```

> ...用于将set集合展开成 1,2,3,4

### 2 检查元素是否存在

使用has(value); 如果存在返回true,不存在返回false

```js
let set=new Set();
set.add(5);
set.has(5);  //返回: true
set.has(6);  //返回: false
```



### 3 移除元素

调用delete()方法传入值可以移除一项，调用clear()移除全部元素

```js
let set=new Set();
set.add(5);
set.add(6);
set.delete(5);  //删除5
set.has(5);  //返回: false
set.clear(); //删除全部元素
set.size;    // 0
```

### 4 Set集合中的forEach()方法

Set的forEach和数组的有点不同，接受三个参数

* Set集合中下一次索引的位置
* 与第一个参数一样的值
* 被遍历的Set集合本身

由于Set没有键名，为了和其他集合(Array Map)的forEach保持一致，所以也有三个参数，但第一个参数和第二个参数相同。

```js
let set=new Set([1,2]);
set.forEach(function(value,key,ownerSet){
    console.log(key+' '+value);
    console.log(ownerSet===set)
})
//输出： 1，1
//		true
//		2,2
//		true
```

在Set集合的forEach()方法中，第二个参数也和数组的一样。如果需要在回调函数中使用this调用，则可以将它作为第二个参数传入forEach()函数。

```js
let set=new Set([1,2]);
let processor={
    output(value){
        console.log(value);
    },
    process(dataSet){
        dataSet.forEach(function(value){
            this.output(value)
        },this);//传入this
    }
};
processor.process(set);
//输出 1 2
```

也可以使用箭头函数，这样就不用传入this了

```js
let set=new Set([1,2]);
let processor={
    output(value){
        console.log(value);
    },
    process(dataSet){
        dataSet.forEach(value=>this.output(value));//从外围的process()函数读取this
    }
};
processor.process(set);
```

### 5 Weak Set集合

#### 5.1 为什么需要weak Set集合?  

将对象储存在Set实例中和储存在变量中相同，只要Set实例中的引用存在，垃圾回收机制就不能释放该对象的内存空间。例如

```js
let set=new Set(),
    key={};
set.add(key);
console.log(set.size);//1
key=null;//移除原始引用

console.log(set.size); //1  Set实例中依然存在对key的引用，这种引用属于强引用
//重新取回原始引用
key=[...set][0];
```

为了在移除外部引用的同时也移除Set实例中的对象，可以使用Weak Set类型，即弱引用的Set类型。

#### 5.2 创建Weak Set集合

* 集合支持三个方法,add() has() 和delete()
* 集合必须传入一个对象作为值，不接受任何原始值
* 集合支持对象的弱引用，在外部引用移除时，Weak Set中的引用也会自动移除
* 不可迭代，不支持forEach,不暴露任何迭代器，不支持size

使用场景： 如果你只需要跟踪对象的引用，那么你应该使用Weak Set而不是普通的Set





##四 ECMAScript6中的Map集合

### 1 简介

Map类型是一种储存着很多键值对的有序列表。键名的等价性判断是通过调用Object.is()方法实现的，所以数字5和字符串'5'会被判定成两种类型。

#### 2 向Map中添加元素

调用set()方法并分别传入键名和对应值作为两个参数

从集合中获取信息，调用get()方法

```js
let map=new Map();
map.set('title','lalalal');
map.set('year',2016);
console.log(map.get('title'));//lalalal
```

*在map中可以使用对象作为建值，这样可以不修改对象本身就可以为对象添加附加信息*

### 3 支持的方法

Map和Set有三个通用的方法

* has()   检测指定的键名是否存在
* delete() 从map集合中移除指定键名和对应的值
* clear()      清空map集合

Map同样支持size属性，返回键值对的数量

### 4 初始化方法

可以传入一个数组，进行快速初始化

```js
let map=new Map([['name','Jack'],['age',25]]);
```



### 5 forEach方法

和数组的forEach类型，接受三个参数  分别是value(值),key(值对应的键名),map(map本身)

可以指定forEach()函数的第二个参数作为回调函数的this值

### 6 Weak Map集合

Weak Map是弱引用的Map集合，最大的用途是保存页面中的DOM集合。

Weak Map的键名必须是对象

```js
let map=new WeakMap(),
    ele=document.querySelector('.ele');

map.set(ele,'Original');
console.log(map.get(ele));//'Original'
//移除ele元素
ele.parentNode.removeChild(ele);
ele=null;
//此时,Weak Map集合为空
```

#### 6.1 Weak Map可用于保存私有对象数据

```js
let Person=(function(){
    let privateData=new WeakMap();
    function Person(name){
        privateData.set(this,{
            name
        });
    }
    Person.prototype.getName=function(){
        return privateData.get(this).name;
    };
    return Person;
}());

```

在上面的示例中，name是属于Person对象的私有数据,只能通过实例的getName()获取

 当你只需要使用对象作为键时，Weak Map是最好的选择



