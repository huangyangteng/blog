# vue开发环境配置跨域，一步到位

> 本文要实现的是：使用vue-cli搭建的项目在开发时配置跨域，上线后不做任何任何修改，接口也可以访问
>
> 阅读时间需要三分钟

production：产品  生产环境

development：开发  开发环境

## 1.开发环境设置跨域

* 使用工具：vue-cli自带的配置 

* 配置目录 /config/index.js

![image-20190115222845702](https://ws2.sinaimg.cn/large/006tNc79gy1fz7n1usyt8j31ea0ma4h0.jpg)

```js
//自行复制黏贴
proxyTable: {
  '/apis':{
    target: 'http://10.1.63.26:19080/',  // 后台api
    changeOrigin: true,  //是否跨域
    // secure: true,
    pathRewrite: {
      '^/apis': ''   //需要rewrite的,
    }
  }
}
```



注意：以上配置只有在生产环境下有效，你打包之后就不起作用了

这样就存在一个问题，你的接口都是/apis开头的，部署到服务器后要去除/apis,才能正常访问后台接口，如何解决呢？

## 2.生产环境设置跨域

> 使用工具 axios [中文文档地址](https://www.kancloud.cn/yunye/axios/234845)

### 思路

解决的==思路==是这样的：

首先，axios有一个baseURL的属性，配置了baseURL之后，你访问接口时就会自动带上

```js
假设你vue-cli起了一个开发环境，地址为http://localhost:8080
//例1 当不设置baseURL时
axios.get('/user')  //访问/user相当于访问 http://localhost:8080/user

//例2 
axios.baseURL='/apis'
axios.get('/user')  //访问/user就相当于访问 http://localhost:8080/apis/user

//例3
axios.baseURL='https://sbsb.com'
axios.get('/user')  //访问/user就相当于访问 https://sbsb.com/user

//例4
axios.baseURL='https://sbsb.com/apis'
axios.get('/user')  //访问/user就相当于访问 https://sbsb.com/apis/user


```

然后我们要根据现在的环境是开发环境还是生产环境，配置不同的baseURL

```js
//判断是否是生产环境
var isPro = process.env.NODE_ENV === 'production' //process.env.NODE_ENV用于区分是生产环境还是开发环境
//配置不同的baseURL
module.exports = {
    baseURL: isPro ? 'http://sbsb.com:8888/' : '/apis'
}
```

`process.env.NODE_ENV`用于区分是生产环境还是开发环境，这个值是webpack设置的

### 动手操作

> 假设后台的网址是`http://sbsb.com:8888/`

首先在/config目录下新建一个文件,我这里叫api.config.js
写入以下代码

```js
//判断是否是生产环境
var isPro = process.env.NODE_ENV === 'production' //process.env.NODE_ENV用于区分是生产环境还是开发环境
//配置不同的baseURL
module.exports = {
    baseURL: isPro ? 'http://sbsb.com:8888/' : '/apis'
}
```

然后，在main.js中引入axios和刚才那个文件

```js
//main.js
import Vue from 'vue'
import axios from 'axios'
import apiConfig from '../config/api.config.js'
axios.baseURL=apiConfig.baseURL
//axios的其他配置...
```

这样配置之后，打包部署到服务器上也不用再手工去除/apis

如果配置过程中出现了问题，自己调试，看看访问的url正不正确