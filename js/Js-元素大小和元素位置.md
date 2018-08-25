# Js-元素大小和元素位置

## 1 .偏移量

![image-20180816160122641](/var/folders/8p/w9p5cj3n4wxfdwnsxj16rkcc0000gn/T/abnerworks.Typora/image-20180816160122641.png)

通过4个属性可以获得元素的偏移量

* offsetHeight  元素在垂直方向上占用的空间大小 单位是像素，包括元素的高度、(可见的)水平滚动条的高度、上下边框的高度
* offsetWidth 元素在水平方向上所占用的空间大小
* offsetLeft 元素的左外边框到父元素的左内边框之间的像素距离
* offsetTop 元素的上外边框到父元素的上内边框之间的像素距离

要获得元素在页面上的偏移量，可以将这个元素的offsetLeft和offsetTop的offsetParents的相同属性相加，如此循环到根元素。

注意：div元素的offsetParent是body，不管嵌套多少层



## 2. 客户区大小（元素内部空间大小）

![image-20180816163313191](/var/folders/8p/w9p5cj3n4wxfdwnsxj16rkcc0000gn/T/abnerworks.Typora/image-20180816163313191.png)

* clientHeight  包括内容区和内边距，不包括边框
* clientWidth

## 3. 滚动大小

包含滚动内容的元素的大小

![image-20180816163528394](/var/folders/8p/w9p5cj3n4wxfdwnsxj16rkcc0000gn/T/abnerworks.Typora/image-20180816163528394.png)

* scrollHeight  在没有滚动条的情况下，元素的总高度
* scrollWidth 在没有滚动条的情况下，元素的总宽度
* scrollLeft 被隐藏在内容区域左侧的像素数
* scrollTop 被隐藏在内容区域上方的像素数，通过这个属性可以改变元素的滚动位置

##4 确定元素大小的位置



![image-20180816193625525](/var/folders/8p/w9p5cj3n4wxfdwnsxj16rkcc0000gn/T/abnerworks.Typora/image-20180816193625525.png)



getBoundingClientRect()方法，返回一个对象，包括四个属性：left top right 和bottom,这些属性给出了元素在页面中相对于视口的位置

向上滚动时，top会逐渐减少，当top为0时，滚动到最顶端，当top=整个页面的可见高度时，处理视口的临界点，再向上滚动一点，就会进入视口，被用户看到