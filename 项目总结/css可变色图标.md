# css可变色图标及原理分析

> 本文的目标是：使用css可以控制图标的颜色，大小
>
> 需要工具：[png转svg工具(如果ui给的svg就更好了)](https://www.bejson.com/convert/image_to_svg/)    [iconfont(图标转代码)](https://www.iconfont.cn)

[TOC]

##第一步，把图标转成svg格式的

1. 打开网址 https://www.bejson.com/convert/image_to_svg/

2. 上传

3. 下载


![image-20190118111938753](https://ws4.sinaimg.cn/large/006tNc79gy1fzakkpy2lqj30wg0h048d.jpg)

##第二步，使用iconfont生成代码

打开网址：https://www.iconfont.cn

点击`图标管理->我的图标`，如下图

![image-20190118112104561](https://ws3.sinaimg.cn/large/006tNc79gy1fzakm2m0yuj316s0gz78k.jpg)



进入到`我的图标`之后，点击上传icon,如下图

![image-20190118112203237](https://ws3.sinaimg.cn/large/006tNc79gy1fzakn3chwvj30yf0f9n1c.jpg)



`点此上传` 选中svg文件，

![image-20190118112313024](https://ws4.sinaimg.cn/large/006tNc79gy1fzakobmgnjj30yr0jutg1.jpg)



上传之后，点击`去除颜色并提交`

![image-20190118112337939](https://ws4.sinaimg.cn/large/006tNc79gy1fzakoq7vsvj30wa0h1taa.jpg)



上传完之后就会自动回到图标管理页，点击`批量操作->批量加入购物车`，然后进入购物车



![image-20190118112725107](https://ws3.sinaimg.cn/large/006tNc79gy1fzaksobovrj30st0g0n18.jpg)

在购物车中，点击`下载代码`

![image-20190118112823232](https://ws1.sinaimg.cn/large/006tNc79gy1fzaktnxg6nj308l0po752.jpg)

## 第三步，生成的代码运用到项目中

生成的项目目录如下：

![image-20190118113226086](https://ws1.sinaimg.cn/large/006tNc79gy1fzakxvl7mhj30bn0a1mxv.jpg)



点击demo_index.html，可以查看官网给出的使用方式

![image-20190118113545069](https://ws1.sinaimg.cn/large/006tNc79gy1fzal1c7w2aj30jh0padko.jpg)



我项目中使用的是第二种，所以只介绍第二种使用方式

第一步，把iconfont.css复制到你的css样式中

![image-20190118113700383](https://ws3.sinaimg.cn/large/006tNc79gy1fzal2nlil1j31110ed7a5.jpg)



第二步，根据iconfont.css中你需要的字体，把生成的项目中的字体文件和svg文件复制到你的项目目录中，需要和css文件同级目录，否则需要修改`iconfont.css`中引入字体文件的路径，默认情况下引入下图的字体(如果不需要兼容ie8和ios4.1-，可移除相应的字体，详情看下面的介绍)

![image-20190118113932573](https://ws2.sinaimg.cn/large/006tNc79gy1fzal5a73wzj308t07q3z9.jpg)



第三步，使用

```html
<span class="icon iconfont icon-play"></span>
//或者
<i class="icon iconfont icon-play"></i>
```

改变样式的话

```css
span{
    color:red
}
i{
    color:red
}
```



## 最后，原理分析

### 1. 理解@font face规则

@font face的本质是`变量`，该规则支持的css属性有很多，我们常用的有：`font-family`,`src`,`font-style`,`font-weight`

首先来看一下，font-family,这里的font-family可以看成一个`变量`，名字可以随便取，比如用一个$符，但要注意不要覆盖系统已经存在的字体

```css
/*font-family如果是符号的话需要用引号包起来*/
@font-face{
    font-family:'$'
}
/*使用iconfont生成的@font-face规则font-family如下：*/
@font-face{
    font-family:'iconfont'
}
```

然后看下我们的重点`src`属性，src属性用来引入字体资源，引入的字体资源可以使本地的(使用`local()`引入)，也可以是外链字体(使用`url()`引入)，注意local要ie9及以上版本才支持

这里我们重点来看下url功能符

```css
@font-face{
    font-family:'icon';
    src:url('icon.eot') format('eot');/*ie6-8*/
    src: url('icon.eot#iefix') format('embedded-opentype'),
        url('icon.woff2') format('woff2')
        url('icon.woff') format('woff'),
        url('icon.ttf') format('typetrue'),
        url('icon.svg#icon') format('svg');
}

//format的作用是让浏览器提前知道加载字体的格式，以决定是否加载字体


```

上面代码一共出现了五种字体格式，分别是eot,woff,woff2,ttf,svg

* svg格式是为了兼容ios4.1及之前的版本，现在的ios版本都到11了，所以完全可以舍弃
* eot是ie私有的，所有版本的ie都支持eot格式，并不是只有ie6-8。只是，ie6-ie8仅支持eot这一种格式
* woff（web open font format）是专门为web开发而设计的字体，其字体尺寸更小，加载更快，应该优先使用。Android4.4开始全面支持
* woff2是woff的二代，字体文件尺寸更小，但是仅chrome和firefox支持的比较好
* ttf作为系统安装字体的格式，兼容性很好，但体积较大

综上，我们得出以上结论

1. svg格式果断舍弃
2. 如果无需兼容ie8,eot格式舍弃
3. 如果无需兼容Android4.3以前的版本，ttf格式舍弃



### 2. iconfont生成字体图标原理

iconfont生成的字体如下：

```css
@font-face {
    font-family: "iconfont";
    src: url('iconfont.eot?t=1547714990292');
    /* IE9 */
    src: url('iconfont.eot?t=1547714990292#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAP4AAsAAAAACBgAAAOrAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAqEJINPATYCJAMICwYABCAFhG0HLhvzBhHVm0XJviiwjblCNx4e1RAbqvoScwd3wUWGawQq7bPvQzw8v+7p3Hnv/52F1bbLColMUKi7FapgBBOVZ2CcDsadACIZ7O93+tTc9nW/JuKoRNUmmiAW/joh4qVzC50Q2dyMtzUqQrEk53k/fUfSbiDkVwD8cbjXpgc4313a5Tjnoi7AOJAC3QPXAgmkD/LJv+Mfxi5oibsJNNLNEDGmNWWOUmYOCsSW0/qVyoxcbkgNpVCvmJnFaTVlcaQ4A3Aq+Pn4SjFKCrXEzJixbuwaIz4AKyLtrnZb4iEwptOCzSNhCDIxp1I/TYr8QySNVH/Wi22lBh8uVeXRN/uPRxB1Jr8JxHahXxPDYV4qdQEy7bmG94PORFqVlcjqH+baAbu7AM71qavD+25xUwr1TdTSXbmOgjo6aOTEtdzzhlD07Wfwh3kNLWxrj7Bjinp06gAWdAde7N/YCAfvirOKDa3s6mN/sJ8ePobHHoaNg/S9S30z1dTNb5s47+kQFh7MCP6N69BdPqII7qzvF2OXbAPsvszfu4zfS9cuo4/fe41Hu47H1ORtqTPw0k8353NTd41KqYcHt8d4mj81ujIHd/JT9939WKmT19BaV8T0GUgcUlMYh5QtAZn08c/zD3y/2idiavJz5oyGdIuw8C6CcGkCHZZGgb2tr32WF30s8se1QLHTBzjI4vpTFv32/uArMNIVuOMe/9uiattoCCv1s7JmyNmnsM132Ghb8VY9/qd0iaO4yFgqGsi3pQVkDaEjVc7aqf7juAtroRNgSjfcFDl2BGnfaPlxuxjJ20utDr0Oy/3YZ/qLFceoimHNsa4yGnacG0Tnm91qCBkydLHIzmuI+HxPexAwAlQofaTjX/0d42/y/5Y3r/8vYQbPKfBKYK1QBnQzUt67IfiHjI51WWOZiiIrjMpw4Zr0bkoaaYQKw+ZW3g41tiXRhpIzIBQa6ApJqQ8yY4dATWPDoK40HBoZbPz8xlrbJYncEIMcABBauAqFZu5C0sJjZMa+gZp2vkNdi0jQyLwgV2yM6hdRjWbUgg7MH6LdGtkqUWHqDf27aE6zAvwL+YwumPoxH7piQ55izPnxswgB8VZhBfthKRvsvCW00geRfRkGqrpRb7faKaMZtaAD5g+i3Rp5zUUVvn9D/y6aG2qqtC/kM3YOJr2xA/LKb51qbuWQ8+NnIgSItwpWoMVi+TewV3dLaKUXBnj3xYAaUVd+v7ywvt0WaMSUFGHlJnlH0f+uAwA=') format('woff2'), url('iconfont.woff?t=1547714990292') format('woff'), url('iconfont.ttf?t=1547714990292') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
    url('iconfont.svg?t=1547714990292#iconfont') format('svg');
    /* iOS 4.1- */
}

.iconfont {
    font-family: "iconfont" !important;
    font-size: 18px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    cursor: pointer;
}

.icon-play:before {
    content: "\e601";
}
```



这里有两个需要关注的东西，一个是`字体`,另一个是`字符`，这两个东西就是字体图标技术的本质。

字体的本质是字符集与图形的一种映射关系。

字体图标技术的实现就是把通常的字符集映射成了另外的图标形状.
例如把 \e601\映射成了![image-20190118221544393](https://ws4.sinaimg.cn/large/006tNc79gy1fzb3j7s4lcj302q02a3yf.jpg)









