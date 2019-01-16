# js错误处理

###一、常见的错误类型

#### 1. 类型转化错误

在使用类型转换操作符'=='、'!='以及在流程控制if()while()中使用非布尔值时，有可能会发生类型转化错误

举个例子

```js
function contact(str1,str2,str3){
    var result=str1+str2;
    if(str3){//不要这样判断
        result+=str3
    }
    return result;
}
```

这个函数的作用是连接两个或者三个字符串，其中第三个参数是可选的。

像上面的写法是不可取的，因为并不能确定第三个参数是字符串，当第三个参数为数字1时，程序就会得到非预期的结果

正确的做法如下

```js
function contact(str1,str2,str3){
    var result=str1+str2;
    if(typeof str3 == "string"){
        result+=str3
    }
    return result;
}
```



#### 2.数据类型错误

js在函数传参数时，不会对实参和形参的类型进行检查，所以需要编程人员自己写程序进行数据类型的检测

例子：

```js
function getQueryString(url){
    var pos=url.indexOf('?');
    if(pos>1){
        return url.substring(pos+1);
    }
    return ' ';
}
```

上面的函数，在参数不为url为就会报错，正确的做法是首先判断参数的类型

```js
function getQueryString(url){
    if(typeof url == 'string'){
        var pos=url.indexOf('?');
        if(pos>1){
            return url.substring(pos+1);
        }
        return ' ';        
    }

}
```

对于数组类型来说，使用instanceof进行判断

```js
function arrSort(values){
    if(values instanceof Array){
        sort(values);
    }
}
```



#### 3.通信错误

通信错误的类型有很多种，一般的库都会有相应的处理方式，例如jquery的ajax库

```js
$.ajax({
    url:'http://www.test.com/getUser',
    method:'get',
    success(){
        
    },
    error(e){//在error的回调函数中进行相应的处理
        
    }
})
```

例如axios

```js
axios.get('xxx')
    .then(data=>{
    
})
    .catch(err=>{//处理错误
    
})
```







### 二：错误处理的方式

对于未知的错误，try-catch进行处理

```js
try{
    //有可能会发生错误的语句
}catch(e){
    //捕获到错误后进行相应的处理，未捕获到错误不执行catch块的代码
}finally{
    //不管错误是否发生，一定会执行的代码
}
```



对于已知的错误，抛出去

```js
function div(a,b){
    if(typeof a != 'number' || typeof b != 'number'){
        throw new Error("被除数和除数都要为数字")
    }
    if(b===0){
        throw new Error("被除数不能为0")
    }
    return a/b;
}
```

对于大型项目，一般使用assert()进行抛出错误

```js
//assert接受两个函数，第一个参数是求值应该为true的条件，第二个参数是条件为false时要抛出的错误
function assert(condition,message){
    if(!condition){
        throw new Error(message);
    }
}
```

对上面的函数进行修改

```js
function div(a,b){
    assert(typeof a != 'number' || typeof b != 'number',"被除数和除数都要为数字");
    assert(b==0,"被除数不能为0");
    return a/b;
}
```



