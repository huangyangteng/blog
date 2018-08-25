# js小技巧

## 1. html页面a标签如果href属性为空，点击时会刷新页面

```js
//方法1.把a的href设置成javascript:;  

<a href="javascript::">link</a>

//这样做的缺点是写的很累

//方法2 使用js,阻止a的默认事件

//获取所有的a元素 -> 转化为数组(借用数组的slice方法) -> 添加事件侦听器，阻止默认事件

var all_link= Array.prototype.slice.call(document.getElementsByTagName('a'));

all_link.forEach(item => {
    item.onclick=function(e){
        e.preventDefault();
    }
});


```

