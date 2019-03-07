# webpackJsonp is not defined 是什么鬼错误

> vue-cli生成的项目打包后报错``` webpackJsonp is not defined```
>
> vue-cli版本  2.xx
>
> 这个错误困扰了自己一天，记录一下

##背景：

项目页面完成，api对接完成，但是首页加载速度很慢，所以我引入了webpack预渲染插件[prerender-spa-plugin](https://juejin.im/post/59d49d976fb9a00a571d651d)提高首屏加载速度，这个插件需要路由改成history的方式，我改了；然后服务器端安装vue-router官网说明配置了nginx

![image-20190228170210379](https://ws2.sinaimg.cn/large/006tKfTcgy1g0m8vli2edj30o405ljrh.jpg)

一切配置完成之后，```npm run build```打包，之后再浏览器打开网址  ```localhost:3000```,自动跳转到```localhost:3000/login``` ，打开速度非常快，大概两三秒吧。之后再刷新页面，就会报错了  ``` webpackJsonp is not defined``` ，然后我就开始重现错误，总结出来错误的表现形式

## 错误的表现形式

浏览器输入 localhost:3000    地址栏变为  localhost:3000/login  不报错

浏览器输入  localhost:3000/login    回车后地址栏变成 localhost:3000/login/   报错   后面多了一个/

地址栏显示 localhost:3000/login(不报错的情况下) 刷新浏览器，地址栏变成localhost:3000/login/  报错  后面多了一个/

## 解决过程

1. 先google可一下，发现网上大多数出现这个错误的原因是```没有引入CommonsChunkPlugin生成了公共文件```，查看自己的webpack.prod.conf.js文件，发现引入了ComminsChunkPlugin，排除这个错误
2. 又goole了很久，没有找到错误的原因
3. 突然灵机一动，是不是因为nginx配置的原因  ..md



##最后解决方式

nginx的配置要修改一下

```shell
//原配置
location /{
    try_files:$uri $uri/ /index.html;
    
}
//现在的配置
location /{
    try_files:$uri /index.html;
    
}
```

 

错误的原因找到了，$uri是导致错误的一部分

当用户请求 http://localhost/example是,$uri是/example.

try_files会在硬盘里尝试找这个文件，如果存在/example的文件，就返回

如果不存在，就看$uri/,也就是看看有没有/example/的目录

如果再找不到，就会执行try_files的最后一个选项，/example/index.html



导致错误的真正原因我还不知道，如果知道的请在评论区说一下，谢谢





















