



# 前端使用jenkins进行持续集成（超详细）

> 前端项目是使用vue-cli生成的，以此为例。
>
> 我们先定一个小目标： 前端svn或者git提交之后，jenkins会获取到我们的提交项目的目录和文件，它会把我们的文件打包(npm run build)，发送到我们配置的服务器。其他的测试什么的我们先不处理

## 一、什么是持续集成

## 二、jenkins下载与安装

> jenkins是以插件为核心的，需要做什么就去安装相应的插件

## 三、使用介绍与配置

> 再强调一遍，jenkins是以插件为核心的，需要做什么就去安装相应的插件

首先，看下主界面

![image-20190117102514625](https://ws4.sinaimg.cn/large/006tNc79gy1fz9ddql8b5j31lm0u0wsn.jpg)

我们要做的第一步就是安装插件  左侧菜单中点击系统管理-》插件管理

![image-20190117102611816](https://ws2.sinaimg.cn/large/006tNc79gy1fz9depdaplj31li0u0k90.jpg)



点击`可选插件`,然后搜索我们要安装的插件

* nvm wrapper    node的环境，安装了之后就可以使用npm run build等功能

* publish over ssh  把npm打包后的文件发送到我们自己的服务器

  

![image-20190117102749680](https://ws3.sinaimg.cn/large/006tNc79gy1fz9dgfuhtfj31kw0u0k85.jpg)



选中之后，点击`直接安装`，安装完成后重启一下

