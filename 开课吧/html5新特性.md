#笔记2018-9-10

html5新特性讲解 

1. geolocation
2. video audio
3. localStorage
4. webworker
5. 文件操作、拖拽
6. manifest
7. canvas

## 1. geolocation

定位的、手机上

原理：通过硬件实现定位

* pc 根据ip地址定位
  * 问题1 精度低 
  * 需要ip地址库
    * chrome—ip库在国外
* 手机 通过GPS定位

//两种方式

单次获取 getCurrentPosition(成功函数，失败函数，参数)

监听 导航 watchPosition(成功，失败，参数)

结果

Latitude/longitude  精度/纬度

```js
//window.navigator.geolocation
if(window.navigator.geolocation){
    navigator.geolocation.getCurrentPosition(res=>{
        //参数有很多
        //res.coords上有很多参数
        //latitude  经度
        //longgitude 纬度
    },err=>{
        
    },{//参数
        enableHignAccuracy,//高精度模式
        timeout,//超时时间 ms
        maximumAge//最大生存时间 缓存 ms
        
    })
}
```



navigator.geolocation.watchPosition(function(res){

	
	//参数和getCurrentPosition一样

})

//watchPostion返回一个watchId,用于取消监听

取消监听

navigator.geolocation.clearWatch(watchId)



## 2 .video

属性

1. autoplay 自动播放
2. Loop 循环播放
3. Poster 封面地址
4. Controls 播放控件

支持格式：

1. ie
   1. Wmv window有版权，其他浏览器不支持
   2. Mp4 
2. chrome
   1. webq
   2. mp4 
3. Firefox 
   1. ogv
   2. mp4

```html
<video src="1.mp4" contrls autoplay >
    你的浏览器不支持video
    <flash></flash>
</video>
```



audio

1. 格式 .mp3

js操作video和audio

属性：

currentTime  当前播放位置，单位s

duration  整个视频的长度 播放进度提示

Volume 音量 01-100

Muted  静音 boolean

方法：

play() 播放

pause() 暂停

```js
//js操作视频
//停止：pause()+currentTime=0;
//自定义进度条
//video 上面所有的时间都是dom3事件，不能通过.调用，要使用addEventListener
 
addEventListener('timeupdate',function(){
    console.log(oV.currentTime)
},false}

        

```

1. 播放速度如何设置？

	网页无法设置，

       1.服务器调整速度，存成多个文件  2. 点播调整码率

	1:1

	1:1.2

	1:1.5

video宽高怎么适配到div宽600，height400在容器内，并且视频不能变畸形

w=600,

h=400

w,h

2. 判断长宽比，（保持宽高比）宽度为主,宽度变成100%

，高度为主的话，高度变成100%

![image-20180910193220362](/var/folders/8p/w9p5cj3n4wxfdwnsxj16rkcc0000gn/T/abnerworks.Typora/image-20180910193220362.png)

if(w/h>W?H)else{ '宽'

} else{

}



3.试看五分钟

服务器在生成视频的时候切成两段，非vip只能给第一个

4. 干掉下载按钮

通过流的方式



##3.多进程和多线程的区别

|          | 多进程               | 多线程                     |
| -------- | -------------------- | -------------------------- |
| 开销     | 创建、销毁开销大     | 创建、销毁开销小           |
| 安全性   | 进程之间是隔离的     | 线程之间是共享的           |
| 资源     | 每个进程之间独立资源 | 同一进程的所有线程共享资源 |
| 共享资源 | 麻烦                 | 方便                       |
| 编程难度 | 低（资源是独享的）   | 高（资源是共享的）         |

总结

多进程：性能低，编写简单

多线程：性能高、编写复杂

Java c 多进程/多线程

Php 多进程

Js 多进程

---

webWorker —浏览器上实现的多进程

怎么用？

主进程+若干子进程（工作进程）     

web端：

主进程              ui进程

子进程		看不见的|计算，数据请求

工作进程不能跨域，必须放在单独的js文件中

```js
//index.html
<input type='text' value="计算">
<input type='text' value="计算">
<input type='button' value="计算">
//1.创建子进程
let w=new Worker('w1.js');
//2.发送任务过去
w.postMessage({n1,n2});

//6.接受任务
w.onmessage=function(ev){
    // ev.data
}
    
    
```

```js
//w1.js
//3 接受
this.onmessage=function(ev){
    //ev.data 是主进程发过来的数据
    //4.处理任务
    
    //5.返回
    this.postMessage(result)
}
```

优点

1. 充分利用计算机的工作（多个进程同时工作）
2. 防止主进程卡住

缺点：

1. 不能执行任何UI操作，子进程只能执行计算型任务

结论：webWorker在工作中用的很少-web中计算型任务不多

## 3. mianifest

文件

1. 哪些要缓存
2. 哪些不要缓存
3. 哪些文件没有读到，读替补文件



```

```



```index.html

```

## 3. 文件拖拽

邮箱传附件、上传文件

拖拽api

1. ondragenter 进入
2. ondrageleave 离开
3. ondrageover  悬停时不断触发
4. ondrop 松手 —如果dragove不阻止默认事件，drop不会发生
5. 读取文件 e.dataTransfer.files





```js
window.onload=function(){
    oDiv.ondragenter=function(){
        oDiv.innerHTML='释放鼠标';
    }
    oDiv.ondragleave=function(){
        oDiv.innerHTML='将文件拖到这里';

    }
    oDiv.addEventListener('dragover',function(){
        //悬停时不断触发
        //
        e.preventDefault();
        
    },false)
    oDiv.addEventListener('drop',function(e){
        //把一个文件拖入浏览器，默认打开
        //阻止默认事件
        e.preventDefault();
        
        
        
        
    },false)
}
```



```html
<div>
    将文件拖到这里
</div>
```

松手以后，读取文件

 e.dataTransfer.files

fileReader读取文件

let reader=new fileReader();

Reader.read(); 

readAsText 文本文件

readAsDataURL 图片

readAsArrayBuffer  文本 把文件的内容保存在数组里面，每个字节是一位 编辑文件 不实用

readAsBinaryString 把二进制数据转成字符串 二进制的文本形式数据 上传

Reader.onload=function(){

}

reader.onerror=function(){

}

```js
let oFile=e.datatranfer.files[0];
let reader=new fileReader();
//读取文本文件
Reader.readAsText(oFile);
//读取图片
reader.readAsDataURL(oFile)
//读取完毕
Reader.onload=function(){
	reader.result;
    //this.result;
    img.src=this.result;
    
}

reader.onerror=function(){

}

```



问题：

怎么判断文件格式

oFile

* Type 文件类型"image/gif"



二进制和base64如何互转

* base64编码原理



---

## canvas 

1. 画布，只要ps可以做的，canvas就可以画

2. 性能特别高--大型动画、游戏

```html
<canvas id="c1" width="300" height="300">

</canvas>
```



```js
//获取图形上下文 绘图接口
let gd=oC.getContext('2d');
//画图
//路径操作--根ps里面的选区一样 只是一个范围
1. 路径框上一块区域
2. 描边、填充
gd.moveTo(100,100);
gd.lineTo(300,200);
gd.lineTo(130,350);
gd.lineTo(100,100);

gd.storkeStyle='red';
gd.stoke();//画线
gd.fillStyle='yellow';
gd.fill();//填充
```



路径操作

moveTo/lineTo

划线、填充、颜色

stroke

strokeStyle

fill

fillStyle



---

问题

跨域：—域  不同就是跨域

域 = 协议+域名+端口





问题

1. 高精度的定位需要依赖框架
2. 富文本编辑器 tinymec

预习：

1. fileRaader
2. canvas