# 面试整理-css篇

[TOC]

## 1.实现双飞翼布局(使用flex)

> 背景知识：flex的基本语法 http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html
>
> 

双飞翼布局是指一种常见的网页布局，有如下特点：

* 页面分为三个部分：头 躯干 尾
* 躯干部分分为三栏 左 中 右
* 具体示例如下图

![image-20180703160018778](/var/folders/8p/w9p5cj3n4wxfdwnsxj16rkcc0000gn/T/abnerworks.Typora/image-20180703160018778.png)



实现原理：

1. 整个页面容器使用flex布局，设置flex主轴的方向为column(竖向)，最小高度为100vh（100vh就是占满一页）
2. 设置躯干display:flex，然后就实现了三列等宽，然后设置每一栏占据的高度
3. 注意：html结构中躯干部分分别是main,nav,aside,这是按照重要程度的顺序排列的，在css中要设置,nav一列的order为-1,使之在页面的显示中排在最前面

```html
<body class="HolyGrail">
    <header>header</header>
    <div class="HolyGrail-body">
        <main class="HolyGrail-content">main</main>
        <nav class="HolyGrail-nav">left</nav>
        <aside class="HolyGrail-ads">right</aside>
    </div>
    <footer>footer</footer>
</body>
```

```css
.HolyGrail {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

header,
footer {
  flex: 1;
}

.HolyGrail-body {
  display: flex;
  flex: 1;
}

.HolyGrail-content {
  flex: 1;
}

.HolyGrail-nav, .HolyGrail-ads {
  /* 两个边栏的宽度设为12em */
  flex: 0 0 12em;
}

.HolyGrail-nav {
  /* 导航放到最左边 */
  order: -1;
}
```

> 来源及参考 ：flex布局实例篇http://www.ruanyifeng.com/blog/2015/07/flex-examples.html

## 2 CSS基本单位

> 背景知识：浏览器默认字体大小为16px

本文主要介绍单位

* em
* rem

### em

原则：

* 在css中,1em的计算值等同于当前元素所在的font-size计算值。
* 在设置字体大小时，em的值会随父元素的字体大小改变

例如：

```css
div{
    font-size:16px;
    width:20em;
}
//根据原则1，此时，div的width为 20*16px=320em
```

再来一个例子

```css
h1{
    font-size:2em;
    -webkit-margin-before:0.67em;
    -webkit-margin-after:0.67em;
}
```

假设页面没有css充值，根元素font-size的就是默认的16px,此时h1元素的margin-before是多少？

答案：h1的font-size为2em，根据原则2，h1的父元素的font-size是16px(浏览器默认字体),所以h1的font-size就是32px,margin-before相对于h1的font-size计算，所以是32*0.67=21.44px

用途：em适用于图文内容展示的场景，对此可进行弹性布局。例如，<h1>-<h6>以及<p>等与文本内容展示的元素的margin都使用em作为单位。这样，当用户把浏览器的默认字号从'中'设置成"大"或者'小'时，上下间距也能根据字号大小进行调整，使阅读更舒服。

### rem

即 root em,顾名思义，就是根em的大小，em根据当前元素计算，rem相对于根元素计算。

例如：

```html
html{
    font-size:20px;
}
h1{
    font-size:2rem;
}
p{
    font-size:0.8rem;
}
```

此时，h1的大小为2*20=40px,p的大小为20  * 0.8=16px

用途：用于手机端的响应式布局

兼容：rem属于css3的属性，需要ie9以上



