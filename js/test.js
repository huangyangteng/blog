// ``````````````测试map和reduce结合
// let shoppingCart = [
//     { id: 1, name: '袜子', price: 56, imgs: '1.jpg,2.jpg' },
//     { id: 2, name: '内裤', price: 156, imgs: '3.jpg,4.jpg' },
//     { id: 3, name: '上衣', price: 1156, imgs: '5.jpg,6.jpg' },
//     { id: 4, name: '裤子', price: 4156, imgs: '7.jpg,8.jpg' },
//     { id: 5, name: '胸罩', price: 14156, imgs: '9.jpg,10.jpg' },
// ];
// // let total_price = shoppingCart.reduce((temp, item, index) => {
// //     // return temp.price+','+item.price;
// //     console.log(temp+','+item.price+','+index)
// //     if(index=1){
// //         return temp.price+item.price;
// //     }else{
// //         return temp+item.price;
// //     }
// // })
// // console.log(total_price);
// let total_price = shoppingCart.map(item => item.price)
//     .reduce((temp, item) => temp + item);console.log(total_price);


// ````````编写bind
// Function.prototype.bind=function (context) {
//     let self=this;//保存原函数
//     return function () {
//         return self.apply(context,arguments);//执行新的函数时，会把之前传入的context当做新函数体内的this
//     }

// };
// let obj={
//     name:'jack'
// }
// let func=function () {
//     console.log(this.name);//输出 jack
// }.bind(obj);
// func();

// ```````````bind的改进版，可以传入参数
// // 获取传入的对象，把this指向它
// // 获取传入的其他参数，和调用func传入的参数一起传递给原函数
// Function.prototype.bind=function () {
//     let self=this,//保存原函数
//         context=[].shift.call(arguments),//获得并移除传入的第一个参数，也就是this的指向
//         args=[].slice.call(arguments);//把其他的参数转为数组
//     return function () {
//         return self.apply(context,[].concat.call(args,[].slice.call(arguments)));
//     }

// }
// Function.prototype.bind=function () {
//     let self=this,//保存原函数
//         context=[].shift.call(arguments),//获得并移除传入的第一个参数，也就是this的指向
//         args=[...arguments];//把其他的参数转为数组
//     return function () {
//         return self.apply(context,[...args,...arguments]);
//     }

// }
// let obj={
//     name:'sven'
// }
// let func=function (a,b,c,d) {
//     console.log(this.name);
//     console.log([a,b,c,d]);
// }.bind(obj,1,2);
// func(3,4);

// ```类数组转化为数组
// (function () {
//     let arr=Array.prototype.slice.call(arguments);
//     console.log(arr);
// }(1,2,3))

// ···Weak map使用
// let Person = (function () {
//     let privateData = new WeakMap();
//     function Person(name) {
//         privateData.set(this, {
//             name
//         });
//     }
//     Person.prototype.getName = function () {
//         return privateData.get(this).name;
//     };
//     return Person;
// }());
// let person=new Person('xiaoming');
// let person2=new Person('mingming');
// console.log(person.getName());
// `````````new 的使用
// function Person(name) {
//     this.name = name;
// };
// Person.prototype.getName = function () {
//     return this.name;
// };
// var objectFactory = function () {
//     var obj = new Object(),//从Object.prototype上面克隆一个对象
//         Constructor = [].shift.call(arguments);//获取从外部传入的构造器，此例是Person
//     obj.__proto__ = Constructor.prototype;//指向正确的原型
//     var ret = Constructor.apply(obj, arguments);//用外部构造器传入的值为obj设置属性
//     return typeof ret === 'object' ? ret : obj;//确保构造器总是会返回一个对象
// }
// var a = objectFactory(Person, 'Jack');
// console.log(a.name);


// sort排序
let collections=[
    {name:'作品1',time:'2018-8-8',price:12345},
    {name:'作品2',time:'2018-5-4'},
    {name:'作品5',time:'2018-5-3'},
    {name:'作品3',time:'2019-8-8'},
    {name:'作品4',time:'2014-8-8'},

]
// collections.sort(function (obj1, obj2) {
//     if (obj1.time > obj2.time) {
//         return -1;
//     } else if (obj1.time < obj2.time) {
//         return 1;
//     } else {
//         return 0;
//     }
// })
// var collections = collections.filter(function(item) {
//     return item.price > 10000;
// })
var temp = collections.filter(function (item) {
    return item.price > 10000;
})
console.log(temp)