# 使用原生js替代jquery

> 有时候只是使用jquery的一些功能，但要引入全部的库，为了提高网站性能，用js替代jquery的一些基本功能，比如：选择元素（根据class），对class的操作

## 1. 选择元素

### 1.1 获取对html,body,head,title的引用

```js
var html=document.documentElement;
var body=document.body;
var head=document.head || document.getElementsByTagName('head')[0];
var title=ducument.title;
```





### 1.2 根据css选择器获取样式，支持ie8+

```js
function $$(selector,context){
    context=context||document;
    var eles=context.querySelectorAll(selector);
    return Array.prototype.slice.call(eles);
}
```



## 2.设置class

html5为所有元素增加了classList属性，表示一个元素拥有的所有类。

这个新类型有以下几个方法：

* add(value)  添加类名
* contains(value) 列表中是否存在给定的值，有true,没有false
* remove(value)  删除某个类名
* toggle(value)  如果已经有了，删除它，如果没有，添加它 （注意：这个方法兼容性不好）

[点击查看兼容性及api示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/classList)

[兼容低级浏览器方法(polyfill)](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList#Polyfill)

