# vue项目接口管理

> 在vue开发中，会涉及到很多接口的处理，当项目足够大时，就需要定义规范统一的接口，如何定义呢？
>
> 方法可能不只一种，本文使用axios+async/await进行接口的统一管理
>
> 本文使用vue-cli生成的项目举例

## 举例

拿segmentfault的官网简单举个例子，先看一下官网

![image-20190116232014857](https://ws1.sinaimg.cn/large/006tNc79gy1fz8u5wchokj324z0u0e81.jpg)

看下网站，脑补一下后台给出的文档，如果后台不傻的话给出的文档肯定分模块的，假设后台给出的文档分为了以下几个模块（假设的，不要较真哈）

* 资讯模块 (我的订阅、热门资讯)
* 问答模块
* 专栏模块
* 讲堂模块
* 圈子模块
* 发现模块
* 个人信息模块
* 用户登录注册模块
* ...还有其他很多

一般来说，网站的首页都是复杂的，会用到很多其他页面也会用到api，所以接口统一管理可以做到api的复用

![image-20190116232821886](https://ws3.sinaimg.cn/large/006tNc79gy1fz8uebcdmej31nc0u0e81.jpg)



那么如何做呢？

##Do

### 1.

首先，在src目录下新建一个文件夹，我这里叫apis，后台提供的所有接口都在这里定义

```shell
cd src  #切换到src目录
mkdir apis  #新建apis文件
```

###2.

第二步，按照后台文档划分的模块新建js文件,这里简单举个例子

* 资讯模块： info.js
* 登录注册模块: member.js
* 个人信息模块 user_info.js
* ....

```shell
cd apis #切换到apis目录
touch info.js member.js user_info.js #新建js文件
```

现在的目录大概是这个样子

```js
src
	apis
    	info.js
		member.js
		user_info.js
	main.js
```

###3.

第三步，需要引入axios做相应的配置

在apis下新建一个文件夹,叫http.js,在里面做axios相应的配置

```shell
touch http.js //新建http.js文件
```

配置如下:

```js
import axios from 'axios'

//创建axios的一个实例 
var instance = axios.create({
    baseURL:xxx,
    timeout: 6000
})


//------------------- 一、请求拦截器 忽略
instance.interceptors.request.use(function (config) {

    return config;
}, function (error) {
    // 对请求错误做些什么
    
    return Promise.reject(error);
});

//----------------- 二、响应拦截器 忽略
instance.interceptors.response.use(function (response) {
    
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


export default function (method, url, data = null) {
    method = method.toLowerCase();
    if (method == 'post') {
        return instance.post(url, data)
    } else if (method == 'get') {
        return instance.get(url, { params: data })
    } else if (method == 'delete') {
        return instance.delete(url, { params: data })
    }else if(method == 'put'){
        return instance.put(url,data)
    }else{
        console.error('未知的method'+method)
        return false
    }
}
```

配置简要说明一下：

* 引入axios,新建了个axios的实例(axios的实例的axios的功能一样)

* 请求拦截器响应拦截器不是本文重点，略过

* 第30行代码及以后是重点，拉出来重点看一下

   

```js

/**
 * 使用es6的export default导出了一个函数，导出的函数代替axios去帮我们请求数据，
 * 函数的参数及返回值如下：
 * @param {String} method  请求的方法：get、post、delete、put
 * @param {String} url     请求的url:
 * @param {Object} data    请求的参数
 * @returns {Promise}     返回一个promise对象，其实就相当于axios请求数据的返回值
 */
export default function (method, url, data = null) {
    method = method.toLowerCase();
    if (method == 'post') {
        return instance.post(url, data)
    } else if (method == 'get') {
        return instance.get(url, { params: data })
    } else if (method == 'delete') {
        return instance.delete(url, { params: data })
    }else if(method == 'put'){
        return instance.put(url,data)
    }else{
        console.error('未知的method'+method)
        return false
    }
}
```

###4.

第四步、在apis下面的js文件中引入http.js导出的函数，拿其中一个文件`member.js`说明

```js
//member.js 用于定义用户的登录、注册、注销等

import req from './http.js'

//定义接口  

//在这里定义了一个登陆的接口，把登陆的接口暴露出去给组件使用
export const LOGIN =params=>req('post','/operator/login',params)
//这里使用了箭头函数，转换一下写法：
//export const LOGIN=function(req){
//    return req('post','/operator/login',params)
//}

//定义注册接口
export const REG =params=>req('post','/operator/reg',params)
//定义注销接口
export const LOGOUT =params=>req('post','/operator/logout',params)
```

### 5. 

第五步，在组件中使用接口

登陆组件Login.js使用登录接口

```vue
//Login.vue
<template>
	<div>
        <input type='text' v-modal='user.userId'>
        <input type='text' v-modal='user.pass'>
    </div>
</template>
<script>
    //1. 引入登录的接口定义
    import {LOGIN} from '../../apis/user.js'
    export default{
        data(){
            return {
                user:{
                    userId:'',
                    pass:''
                }
            }
        },
        methods{
        //2. 定义登录的逻辑
        async login(){
            //2.1 awiat LOGIN(this.user) 
              //等待LOGIN(this.user)执行完,
              //把返回值给user_info
            
            let user_info=await LOGIN(this.user)
            
            //2.2假设登录成功,返回的数据应该是 
            	//user_info={code:200,msg:'success',data:{token:'xxxxx'}}
            	//然后根据返回的数据做相应的处理，比如储存token
            
        } 
        },
        mounted(){
            //3. 执行登录
            this.login()
        }
    }
</script>
```



### 6. 

这样定义接口虽然看起来麻烦点，但有以下几个好处：

* 代码看起来规范，所有的接口都在一个文件夹定义，不用分散的各个组件，维护起来简单，例如后台的一些url变了，改起来也方便
* 可以做到接口一次定义，到处使用  

例如首页使用了很多api

```js
//index.js  首页的js文件
import {GET_USER_INFO} from 'apis/user_info.js'  //用户信息
import {GET_CURRENT_INFO,GET_HOT_INFO} from 'apis/info.js' //热门资讯 最新资讯
import {GET_HOT_LECTRUE} from'apis/lectrue.js' //讲座推荐
```

用户界面也会用到用户信息api

```JS
//user_info.js用户信息页面
import {GET_USER_INFO} from 'apis/user_info.js'  //用户信息
```



就先写到这里了，如有错误，请在评论区指正，下次整理下`用户权限相关的内容，包括jwt,token保存和更新,页面权限问题`









