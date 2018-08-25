## 1. 基础知识

### 1.1 使用canvas进行绘制步骤

* 获取canvas元素的引用
* 获取绘图环境变量 getContext()方法
* 设置绘图环境变量的样式，并且开始绘制

```js
var canvas=document.getElementById('canvas'),
    context=canvas.getContext('2d');
context.font='38pt Arial';
context.fillStyle='cornflowerblue';
context.strokeStyle='blue';
context.fillText('Hello Canvas',canvas.width/2-150,canvas.height/2+15);
context.strokeText('Hello Canvas',canvas.width/2-150,canvas.height/2+15);
```

api解释：

* fillText() 
  * 使用fillStyle属性来填充文本中的字符
  * 接受三个参数 要填充的字符 在canvas中显示文办的横纵坐标
* strokeText()
  * 使用strokeStyle属性来描绘字符的轮廓线

警告：在设置canvas的宽高时，不要使用px作为单位

### 1.2 canvas的绘图环境

> canvas元素只是绘图环境对象的容器，绘制需要绘图环境对象来完成。

2d绘图环境的全部属性：

| 属性                    | 简介                                             |
| ----------------------- | ------------------------------------------------ |
| canvas                  | 指向该绘图环境所在的canvas对象                   |
| fillstyle               | 图形填充的使用的颜色、渐变色和图案               |
| font                    | 在调用fillText()或strokeText()时的字体           |
| globalAlpha             | 全局透明度设定                                   |
| globalCompsiteOperation | 将某个物体绘制在其他物体之上时，所使用的绘制方式 |
| lineCap                 | 如何绘制线段的端点 butt(default) round square    |
|                         |                                                  |
|                         |                                                  |
|                         |                                                  |



### 1.5 基本的绘制操作

绘制一个时钟

api

* arc() 创建一个圆的路径
* beginPath()  定义路径
* clearRect() 擦除canvas
* fill() 对路径的内部进行填充
* fillText() 
* lineTo()
* moveTo()
* stroke()  描绘路径的边缘

```js
	
```



函数解释

* drawCircle() 绘制一个表示钟面的圆
  * 先调用beginPath()来定义路径
  * 然后调用arc()创建一个圆的路径
* drawCenter() 创建时钟中心的小实心圆
  * beginPath()
  * arc()
  * fill() 
* drawNumerals() 绘制钟面周围的数字
  * 调用fillText()方法进行文本填充
* drawHand() 绘制时钟的指针
  * 先调用moveTo()将画笔移动到canvas中的指定地点
  * 然后调用 lineTo()方法，在该点与指定的点之间绘制一条不可见的路径
  * 调用stroke()使路径变得可见
* 最后调用setInterval()方法来制作时钟的动画效果
  * 每秒钟调用一次drawClock(),drawClock使用clearRect()方法来擦除canvas,然后重新绘制

























































