》注意：页面中有一个通用的函数$,用来根据id获取元素

```js
function $(id) {
   return document.getElementById(id);
}
```



javascript事件快速复习

* 理解事件流
* 使用事件处理程序
* 不同的事件类型

## 1. 事件流

事件流描述的是从页面中接收事件的顺序。DOM2级规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段

![image-20180812094734987](/var/folders/8p/w9p5cj3n4wxfdwnsxj16rkcc0000gn/T/abnerworks.Typora/image-20180812094734987.png)

## 2. 事件处理程序

### 2.1 为事件指定处理程序的方式有好几种

* html事件处理程序 

  * 事件处理程序内联在html页面中（不推荐）
  * <input type="button" onclick="showMessage()">

* dom0级事件处理程序 将一个函数复制给一个事件处理程序属性

  * 使用dom0级方法指定的事件处理程序被认为是元素的方法，因此事件处理函数是在元素的作用域中，this指向当前元素

  * ```js
    var btn=document.getElementById('myBtn');
    btn.onclick=function(){
        alert('clicked');
    }
    ```

* dom2级事件处理程序

  * 定义了两个方法，用于指定和删除事件处理程序的操作
  * addEventListener() 
  * removeEventListener()
  * 都接受三个参数，要处理的事件名，作为事件处理程序的函数和一个布尔值，true表示在捕获阶段调用函数，false表示在冒泡阶段调用函数

  ```js
  
  var fun1=function(){
     alert(this.id);
  }
  $('myBtn').addEventListener('click',fun1,false);
  ```

  

* IE事件处理程序

  * 实现了与dom中类似的两个方法
  * attachEvent()
  * detachEvent()
  * 都接受两个参数：事件处理函数名称和事件处理程序函数

注意： 在IE中使用attachEvent()与DOM0级方法的区别自傲与事件处理程序的作用域。在使用dom0级方法的情况下，事件处理程序会在所属元素的作用域内运行；在使用attachEvent()方法时，事件处理函数会在全局作用域中运行，因此this等于window.

```js
var btn=$('myBtn');
btn.attachEvent('onclick',function(){
    alert(this === window);  //true
})
```



#### 跨浏览器的事件处理程序



```js
        
        var eUtil={
           addHandler:function(ele,type,handler){
               if(ele.addEventListener){
                   ele.addEventListener(type,handler,false);
               }else if(ele.attachEvent){
                   ele.attachEvent('on'+type,handler);
               }else{
                   ele['on'+type]=handler;
               }
           },
           removeHandler:function(ele,type,handler){
               if(ele.removeEventListener){
                   ele.removeEventListener(type,handler,false);
               }else if(ele.detachEvent){
                   ele.detachEvent('on'+type,handler);
               }else{
                   ele['on'+type]=null;
               }
           }
           
       }
```

这两个方法都会检测传入的元素中是否存在dom2级方法。如果存在则使用dom2级方法。

如果存在的是ie的方法，则采取第二种方案。为了在ie8及更早的版本中运行，事件类型必须加上'on'前缀

最后一种就是使用dom0级方法

使用方法：

```js
var btn=$('btn');
var handler=function(){
   console.log(this.id);
}
eUtil.addHandler(btn,'click',handler);
```

### 2.2 事件对象

在触发dom的某个事件时，会产生一个事件对象event,这个对象包含着与事件有关的信息。包括导致事件的元素、事件的类型以及其他与特定事件相关的信息。

#### 2.2.1 dom中的事件对象

兼容dom的浏览器会将一个event对象传入到事件处理程序中(dom0,dom2都会)。

所有的事件都会有以下的成员

| 属性/方法                  | 类型         | 说明                                                         |
| -------------------------- | ------------ | ------------------------------------------------------------ |
| bubbles                    | boolean      | 表明事件是否冒泡                                             |
| cancelable                 | boolean      | 表明是否可以取消事件的默认行为                               |
| currentTarget              | element      | 事件处理程序当前正在处理事件的那个元素                       |
| defaultPrevented           | boolean      | 为true表示已经调用了preventDefault()                         |
| detail                     | Integer      | 与事件相关的细节                                             |
| eventPhase                 | Interger     | 调用事件处理程序的阶段：1 表示捕获阶段2表示处于目标阶段 3表示冒泡阶段 |
| preventDefault()           | Function     | 取消事件的默认行为                                           |
| stopImmediatePropagation() | Function     | 取消事件进一步捕获或冒泡，同时阻止任何事件处理程序被调用     |
| stopPropagation()          | Function     | 取消事件进一个捕获或冒泡，bubbles为true可调用                |
| target                     | Element      | 事件的目标                                                   |
| trusted                    | Boolean      | 为true表示事件是由浏览器生成的，false表示事件是由开发人员通过js创建的 |
| type                       | String       | 被触发的事件类型                                             |
| view                       | AbstractView | 与事件关联的抽象视图，相当于window                           |





