#canvas 路径操作

###路径操作

moveTo(x,y)

lineTo(x,y) 从xxx画到xxx

beginPath(); 清除前一次的路径

gd.closePath() 封口，闭合路径

stroke()    描边

fill()  填充

样式

lineWidth  线的宽度

strokeStyle 描边颜色

---

画两条线

2. 100，100 -300，300 red
3. 150,100 350,300 green

```js
gd.moveTo(100,100);
gd.lineTo(300,300);
gd.sroken();
//开始一条新的路径
gd.beginPath();





```

---

画图     

1. 移动之前鼠标的位置
2. 移动之后鼠标的位置

```js
let lastX,lastY;
oC.onmousedown=function(){
 //按下鼠标   gd.moveTo(e.offsetX,e.offsetY);
}
//鼠标移动
oC.onmousemove=function(){

    //每次画之前清除之前的
    gb.beginPath()
    //每次只画一小段 移动到上一次的位置，然后开始画到现在的位置
    gd.moveTo(lastX,lastY);
    gd.lineTo(e.offsetX,e.offsetY);  
    lastX=e.offsetX;
    lastY=e.offsetY;
    //可以设置颜色
    gd.strokeStyle='';
    gd.stroke();
}

//鼠标抬起
oC.onmouseup=functioon(){
    oC.onmousemove=null;
    oC.onmouseup=null;
}
```

---

###形状

1. 矩形
2. 弧（圆）
3. 椭圆
4. 多边形

矩形：

1. 路经
2. 直接出图形
3. ？

```js
//路径版
gd.rect(x,y,w,h);左上角位置，宽高
gd.stoken();
//直接出图形
gd.srokenStyle='red';
gd.stokenRect(100,100,400,300)
gd.fillReact()
//
```



弧（圆）

1. arc()  路径操作  圆心(cx,cy)，半径，弧度（startAng,endAng），是否是逆时针
2. 角度： 360度
3. 弧度： 2pi弧度
4. 换算 2pi=360    

```js
//这样画个正圆 不行
gd.arc(400,300,150,0,90*Math.PI/180,true);
gd.stroke();
```

canvas画图表

柱状图-矩形

饼图-弧形 

1. 数据

煤炭3800 水利152 核能361 风能487

2. 算总和    3800+152+361+487=4800  
3. 计算占比  79.17% 3.17% 7.52% 10.15%
4. 占多少角度 285 11.4 27 36.5
5. 每个数据的起始角度和结束角度 0-285 285-296.4 

问题：对于arc()来说，0度在右边   对于数学中的圆来说，0度在上面 

    arc+90=数学上的90

```js
function d2a(n){
    return n*Math.PI/180;
}

let cx=300,cy=400,r=150;
let startAng=30,endAng=70;
#1
gd.moveTo(cx,cy);
//x=cx+sin(ang)*r
let x=cx+Math.sin(d2a(startAng))*r;
//y=cy-cos(ang)*r
let y=cy-Math.cos(d2a(startAng))*r
gd.lineTo(x,y);

#2
gd.arc(cx,cy,r,d2a(startAng-90),d2a(endAng-90),false);


#3
gd.closePath()
```



```js
#封装函数
function pie(startAng,endAng,color){
    
}

```

---

gd.strokeText('ABC',x,y);镂空           定位方式不同：在canvas里面，以文字的基线为准

Gd.fillText()；填充

gd.fontStyle='30px 宋体';

q问题：

1. canvas图形大小自适应
2. 画五角星
3. 饼图鼠标hover上去，变大
4. 加上100%怎么加
5. office搞定canvas















练习：

1. 正方形，四个边颜色不一样

---

下节课 canvas 后半部分、svg/vml 

看一下事件

图形库 echarts raphael d3

canvas+video

video+websocket

websocket原生

