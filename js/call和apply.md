# call和apply
ECMAScript3给Function的原型定义了两个方法,它们分别是Function.prototype.call和Function.prototype.apply。
## 1. call和apply的区别
二者的区别在于传入参数的不同。
apply接受两个参数，第一个参数指定了函数体内this对象的指向，第二个参数为一个带下标的集合，这个集合可以为数组，可以为类数组，apply方法把这个集合中的元素传递给调用apply方法的函数
    
    let func=function(a,b,c){
        console.log([a,b,c]);//输出[1，2，3]
    }
    func.apply(null,[1,2,3]);   //在这段代码中,[1,2,3]对应参数[a,b,c],他们作为apply方法的第二个参数传入func函数中
call传入的参数数量不固定，跟apply相同，第一个参数代表函数体内this的指向，从第二个参数开始，每个参数依次传入函数

    let func=function(a,b,c){
        console.log([a,b,c]);//输出[1,2,3]
    }
    func.call(1,2,3);
当我们调用apply或者call时，如果我们传入的第一个参数为null，函数体内的this会指向默认的宿主对象，在浏览器中是window,如果是在严格模式下，函数体内的this还是为null.

我们使用call和apply有时候不是为了改变this指向，而是为了借用其他对象的方法。

    例如    Math.max.apply(null,[1,2,3,5,9]); //返回值：9
    //Math.max()方法用于确定一组数中的最大值，可以接受任意个数值参数,不可以传入数组作为参数
    Math.max(2,4,5)//返回值：5
    Math.max.apply()方法，把数组[1,2,3,5,9]作为Math.max的参数传入，返回值为9
## 2 call和apply的用途
### 2.1 改变this指向
    在实际开发中，经常遇到this指向被不经意改变的场景，比如有一个div节点，div节点的onclick事件的this本来是指向这个div节点的

    document.getElementById('div1').onclick=function(){
        console.log(this.id);//输出:div1
    }

    假如该事件函数中有一个func,在事件内部调用func时，func体内的this就指向了wndow,而不是我们期望的div

    document.getElementById('div1').onclick=function(){
        let func=function () {
            console.log(this.id);//输出undefined  因为window中没有定义id属性
        }
        func();
    }

    这时候我们可以用call来修正func函数体内的this,使其依然指向div
    记住call的第一个参数决定了func体内的this指向
    document.getElementById('div1').onclick=function(){
        let func=function () {
            console.log(this.id);//输出div1
        }
        func.call(this);
    }
    
    
### 2.2 Function.prototype.bind()
bind()方法，用来指定函数内部的this指向，传入一个对象，把对象的this绑定到调用bind方法的函数上，然后返回一个新函数
    举例子
    
### 2.3借用其他对象的方法