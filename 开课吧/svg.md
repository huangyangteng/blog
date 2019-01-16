#svg

###svg简介

1. 矢量
2. 保存-事件、属性
3. 性能一般



第一个例子

svg虽然是标签，但是不是html，---svg标准

参数有些是可以放在样式中，有些只能做属性

* 决定图形形状位置 只能放在属性上
* 决定图形样式   可以放在style上

//线

```xml
<svg width="800" height="600">  (x1,y1)=>(x2,y2)
    <line x1="100" y1="200" x2="200" y2="300" stroke="#333" stroke-width='20'></line>
    <line x1="100" y1="200" x2="200" y2="300" style="stroke:yellow;stroke-width:20"></line>
</svg>
```

//可以加事件 

```xml
<svg width="800" height="600">  (x1,y1)=>(x2,y2)
    <line x1="100" y1="200" x2="200" y2="300" style="stroke:yellow;stroke-width:20" onmouseover="this.style.stroke='green'" ></line>
</svg>
```

---

第二个例子

//矩形

* rx ry圆角

```xml
<rect x="100" y="100" width="400" height="300" style="fill:red;"></rect>
```

//圆

* r半径
* cx cy圆心坐标

```xml
<circle cx xy r></circle>
```

//椭圆

```xml
<ellipse cx cy rx ry></ellipse>
```

---

### 有用的

path

* M moveto
* L lineTo
* A arc rx ry x轴旋转 大弧标志 镜像标志 x y（终点的x y坐标）

```xml
<path d="M 100,100 L 300,300" style="stroke:red">
	
</path>
```









