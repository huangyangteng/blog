# 响应式web设计

> 读书时间:  2018.7.10-2018.7.13

这本书是在接淘宝外包的时候读的，这本书详细介绍了响应式web设计的原理，css3和html5的新特性，如何使用modernizr.js为ie8及以下游览器提供兼容等，适合响应式网站入门.

## 第1章 HTML5 CSS3及响应式设计入门

### 1.1 工具：

* 为不同浏览器下载视口调试工具（p4）
* 响应式网站
  * http://blog.teamtreehouse.com/
  * http://2011.dconstruct.org/
  * [整理的响应式网站合集](https://mediaqueri.es/)
  * [使用css3动画的特效合集](http://demo.marcofolio.net/)

### 1.2 知识点

1. 视口和屏幕尺寸 ： 视口是浏览器窗口内的内容区域，不包含工具栏、标签栏等。也就是网页实际显示的区域。屏幕尺寸指的是设备的物理显示区域

2. [物理像素和css像素区别](https://www.zhihu.com/question/35221839)

   



## 第2章 媒体查询：支持不同的视口

### 2.1 工具

1. Respond.js是为ie8和更低版本增加媒体查询的工具
2. nomalize.css样式重置

### 2.2 知识点

1. 媒体查询语法

```css
@media screen and (max-width:960px){
    background-color:red;
}
@media screen and (max-width:768px){
    background-color:yellow;
}
@media screen and (max-width:550px){
    background-color:green;
}
```



## 第3章 拥抱流体布局

### 3.1工具

1. 为不同屏幕尺寸准备不同大小的图像

### 3.2知识点

1. 使用百分比布局创建流动的弹性布局，使用媒体查询来限制元素的变动范围
2. 使用em替换px进行文本缩放，em是针对当前对象的px值计算的，px具有继承性，会继承根元素的html值
3. 弹性图片： 图片 视频等媒体元素设置max-width:100%限制宽度,使用max-width为图片设置阙值

## 第4章 响应式设计中的HTML5

### 4.1工具

1. 使用modernizr，让ie支持新的特性
2. [html5样板文件 ](https://html5boilerplate.com/)
3. [测试html文件大纲结构](https://gsnedders.html5.org/outliner/)
4. 

### 4.2知识点 

1. 设置语言类型

```html
<html lang="zh">
    
</html>
```

2. 语义标签

```html
<section>用于定义文档或应用程序中的区域或节</section> 

<nav>放置导航区域</nav>

<article>放置独立的内容片段 ，比如一篇文章</article>

<aside>表示与页面内容松散相关的内容，用来当做侧边栏，放引文，广告，导航，友情链接等</aside>

<hgroup>如果有一组使用<h1><h2><h3>等的标题，可以使用<hgroup>包裹，从而只让第一个标题元素进入文档大纲</hgroup>

<header>不计入大纲结构，用来包含对区域内容的介绍说明</header>
    
<address>包含article或者body的联系信息</address>
```

3. 每个article和section都可以有自己的header和footer
4. nav标签可以用来放链接，不限于导航中的链接
5. 内联语义标签(使用时需要样式重置)
   1. em  强调内容中的重点
   2. i  一小段有不同语气的话
   3. b 文档中的关键词,文章的导语
6. WAI-ARIA无障碍站点 只需要添加role即可

| role          | 含义                                           |
| ------------- | ---------------------------------------------- |
| application   | 用作网页应用的区域                             |
| banner        | 网站的头部或者logo                             |
| complementary | 对主要区域进行补充说明                         |
| contentinfo   | 定义与主要内容相关的信息区域，如页脚的版权区域 |
| form          | 表单                                           |
| main          | 主体                                           |
| navigation    | 导航                                           |
| search        | 搜索                                           |
|               |                                                |

7.在html5中嵌入媒体,有兼容性问题，不同的浏览器支持的格式不尽相同。





## 第5章 CSS3:选择器、字体和颜色模式

## 第6章 用CSS3创造令人惊艳的美

## 第7章 CSS3过渡、变形和动画

## 第8章 用HTML5和CSS3征服表单

## 第9章 解决跨浏览器问题

