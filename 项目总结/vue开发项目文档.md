# vue开发项目文档

# 一、环境依赖安装
## 1. node环境

### 1.1 node和npm环境的安装

> 安装以下教程安装，然后设置好环境变量

http://www.runoob.com/nodejs/nodejs-install-setup.html

视频教程 <http://101.110.118.22/github.liaoxuefeng.com/sinaweibopy/video/node/install-node.mp4>

### 1.2 为npm更改源

> npm默认使用的源的服务器在国外下载速度慢，所以需要更换源
>
> 以下两种方法任选一种

####使用cnpm代替npm

> 参考链接：https://npm.taobao.org/

```shell
# 安装
npm install -g cnpm --registry=https://registry.npm.taobao.org

#安装完cnpm，之后再按照依赖就要使用cnpm
cnpm install [包名]
```

####为npm更换源

> 参考链接 https://segmentfault.com/a/1190000004444283

修改源为淘宝的源

```shell
npm config set registry http://registry.npm.taobao.org/
```

我们在发布自己包的时候需要将官方的源改回来

```shell
npm config set registry https://registry.npmjs.org/
```



### 1.3 管理nodejs的版本

> 切换nodejs版本有两种方式，分别是```nvm```和```n```,n更简单推荐使用

#### 使用n管理nodejs版本

> 参考链接 https://www.jianshu.com/p/c641dcc47b48
>
> 官网 https://github.com/tj/n

```shell
#安装
npm install -g n

#使用n下载所需node版本
n 版本号
#下载最新版本
n latest
# 切换版本
n
然后选中所需版本
#以指定的版本来执行版本
n use 7.4.0 index.js
```

### 1.4 package.json文件详解

> 参考文档 http://javascript.ruanyifeng.com/nodejs/packagejson.html

## 2. webpack安装

> webpack版本更新很快，现在最新版本是4.xx，但是4.xx与vue-cli2.xx脚手架有部分不兼容，因此，如果vue-cli使用的是2.xx版本，webpack推荐版本为3.xx  

webpack中文文档 https://webpack.docschina.org/concepts

### 2.1webpack安装
```shell
#使用npm安装webpack  @指定版本 -g 全局安装
npm i webpack@3.11.0 -g    #全局安装3.11.0版本的webpack  
```



## 3. vue脚手架

> vue-cli目前已经更新到3版本，vue-cli3把webpack相关的配置隐藏起来了，所有的配置都在vue.config.js文件夹中，所以使用vue-cli3需要的webpack水平较高

### 3.1 vue-cli2.x安装

参考链接：https://github.com/vuejs/vue-cli/tree/v2#vue-cli--

安装：

```jade
npm install -g vue-cli
```

用法：

```
$ vue init < template-name >  < project-name >
```

例：

```
$ vue init webpack my-project
```

目前可用的模块包括：

- [webpack](https://github.com/vuejs-templates/webpack) - 一个功能齐全的Webpack + vue-loader设置，具有热重载，linting，测试和css提取功能。
- [webpack-simple](https://github.com/vuejs-templates/webpack-simple) - 一个简单的Webpack + vue-loader设置，用于快速原型设计。
- [browserify](https://github.com/vuejs-templates/browserify) -全功能Browserify + vueify设置用热重装载，linting＆单元测试。
- browserify [-simple](https://github.com/vuejs-templates/browserify-simple) - 一个简单的Browserify + vueify设置，用于快速原型设计。
- [pwa](https://github.com/vuejs-templates/pwa) - 基于webpack模板的vue-cli的PWA模板
- [simple](https://github.com/vuejs-templates/simple) - 单个HTML文件中最简单的Vue设置

### 3.2 vue-cli3.x安装及配置(参考)

vue-cli3x的官方文档：https://cli.vuejs.org/

Vue-cli3 中vue.config.js文件配置参考文档：https://cli.vuejs.org/zh/config/#integrity

```javascript
// vue.config.js 配置说明
//官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
// 这里只列一部分，具体配置参考文档
module.exports = {
  // 部署生产环境和开发环境下的URL。
  // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
  //例如 https://www.my-app.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 baseUrl 为 /my-app/。
  baseUrl: process.env.NODE_ENV === "production" ? "./" : "/",
 
  // outputDir: 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）
  outputDir: "dist",
  //用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: "assets",
  //指定生成的 index.html 的输出路径  (打包之后，改变系统默认的index.html的文件名)
  // indexPath: "myIndex.html",
  //默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变)
  filenameHashing: false,
 
  //   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
  `lintOnSave`: true,
  //如果你想要在生产构建时禁用 eslint-loader，你可以用如下配置
  // lintOnSave: process.env.NODE_ENV !== 'production',
 
  //是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。(默认false)
  // runtimeCompiler: false,
 
  /**
   * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
   *  打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
   *  map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
   *  有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
   * */
  productionSourceMap: false,
 
  // 它支持webPack-dev-server的所有选项
  devServer: {
    host: "localhost",
    port: 1111, // 端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
 
    // 配置多个代理
    proxy: {
      "/api": {
        target: "<url>",
        ws: true,
        changeOrigin: true
      },
      "/foo": {
        target: "<other_url>"
      }
    }
  }
};

```

# 二、开发

> 以下内容依赖环境为 ： vue-cli 版本2.9.x  
>
> 项目github地址 :
>
> * 前端 https://github.com/huangyangteng/vue2-template
>
> * 后端: https://github.com/huangyangteng/vue2-template-server

安装完以上依赖后，就可以开始一个项目了,我们先看下后端api的定义

## 前后端交互报文定义以及数据api接口

###**前后端交互报文定义**

请求

```js
http requrest header{ //除登录注册以外的请求，发起请求时要在请求头中加入token
    authorization:jwt
}
http body{
    
}
```

返回

```js
http response header{
    
}
http response body{
    code:业务处理状态码
    msg:业务处理描述
    token:jwt token
    data:业务数据
}
```



###项目中使用的后台api定义如下



`注：服务器端的host为118.24.85.97，端口为22222`

####`1.测试api是否可用`

1. uri: http://118.24.85.97:22222/api   
2. 描述：测试接口是否能用，能用的话返回 'API WORDS'字符串
3. 请求类型 GET
4. 请求参数 无
5. 返回值 {'Api Works'}

####`2.注册`

1. uri: http://118.24.85.97:22222/api/users/reg
2. 描述:注册
3. 请求类型 POST
4. 请求参数 



| 序号 | 参数名 | 是否必填 | 描述   |
| ---- | ------ | -------- | ------ |
| 1    | name   | y        | 用户名 |
| 2    | pass   | y        | 密码   |

5. 返回参数 不重要



####`3.登录`

1. uri: http://118.24.85.97:22222/api/users/login
2. 描述:登录
3. 请求类型 POST
4. 请求参数 

| 序号 | 参数名 | 是否必填 | 描述   |
| ---- | ------ | -------- | ------ |
| 1    | name   | y        | 用户名 |
| 2    | pass   | y        | 密码   |

5. 返回参数
| 序号 | 参数名 | 描述   |
| ---- | ------  | ------ |
| 1    | msg        | ok |
| 2    | token      | 用于验证用户身份的token |

####`4.获取当前用户信息`

1. uri: http://118.24.85.97:22222/api/users/current
2. 描述:获取用户信息
3. 请求类型 GET
4. 请求参数  无

5. 返回参数
| 序号 | 参数名 | 描述   |
| ---- | ------  | ------ |
| 1    | id        | 用户id |
| 2    | token      | 用于验证用户身份的token |


## 0.初始化项目

在终端中输入

```shell
vue init webpack vue2_template
```

然后会有一些选项让你选,按照项目需求选择，例如我不需要eslint,unit test，就可以选No，现在选no将来如果需要的话也可以自己安装

![image-20190301151747514](https://ws1.sinaimg.cn/large/006tKfTcgy1g0nbhasattj30qw08y0u0.jpg)

安装完成之后，按照提示切换到相应目录，执行相应指令，然后在浏览器打开网址，这样一个简单的vue项目就启动起来了

![image-20190301152115255](https://ws3.sinaimg.cn/large/006tKfTcgy1g0nbkwmojwj30ra0bxgn6.jpg)



## 1. 项目文件介绍

###整个文件介绍：

![image-20190301153205422](https://ws1.sinaimg.cn/large/006tKfTcgy1g0nbw6k8coj30yy0in0y2.jpg)

注意：

1. 开发主要使用src文件夹
2. webpack的配置文件配置文件详解看这里：https://segmentfault.com/a/1190000014804826
3. package.json配置详解 http://javascript.ruanyifeng.com/nodejs/packagejson.html

### src目录介绍

首先在src目录下新建一个文件夹views,用来放我们的主要页面，然后在assets文件夹中建立fonts css imgs，用来存放相应的资源，建完之后，文件夹如下

![image-20190301155249665](https://ws4.sinaimg.cn/large/006tKfTcgy1g0nchr9mrlj30k008u0ty.jpg)



##2. 跨域、axios配置与api管理

在这个项目中，我们使用axios进行数据请求

> axios中文文档： https://www.kancloud.cn/yunye/axios/234845

```shell
# 安装axios
npm/cnpm i axios -S      # -S 指安装到package.json中的dependencies中
```

安装完成后，我们要在main.js中引入,然后测试一下是否成功引入

```js
//main.js文件
import axios from 'axios'

axios.get('https://api.github.com/users?since=10')   //使用github接口做一下测试
  .then(res=>console.log(res))
  .catch(err=>console.log(err))

```

浏览器显示以下信息，说明引入成功![image-20190301160510216](https://ws4.sinaimg.cn/large/006tKfTcgy1g0nculisayj30p2047mxz.jpg)





github提供的接口配置了cors，所以我们能够能够在浏览器正常访问到，但cors兼容性最低到ie10，而且后台不一定会配置cors，所以在开发时我们需要配置一下跨域

参考链接：

1. cors详解 http://www.ruanyifeng.com/blog/2016/04/cors.html

### 2.1配置跨域

> 参考文档：https://segmentfault.com/a/1190000017905030
>

先找个没有设置cors的api使用axios访问一下

```js
axios.get('http://118.24.85.97:22222/api')
.then(res=>console.log(res))
.catch(err=>console.log(err))
```

浏览器会因为同源策略报错

![image-20190307094529285](https://ws3.sinaimg.cn/large/006tKfTcgy1g0tzlds507j31e401kwez.jpg)

下面进行跨域的配置

> 配置目录 config/index.js 13行

```js
proxyTable: {
  '/apis':{
    target:'http://118.24.85.97:22222',//后台地址 proxyTable  把/apis映射成target 即 /apis=http://118.24.85.97:22222
    changeOrigin:true,//是否跨域
    pathRewrite:{
      '^/apis':''
    }
  }

}
```

再进行访问数据时就要在接口前面加上/apis(/apis就相当于http://118.24.85.97:22222)

```js
axios.get('/apis/api')
.then(res=>console.log(res))
.catch(err=>console.log(err))

```

然后就发现浏览器访问成功了

![image-20190307095002857](https://ws2.sinaimg.cn/large/006tKfTcgy1g0tzq4mvtnj30qy00zq31.jpg)

proxyTable原理：跨域是浏览器禁止的，服务端并不禁止跨域 ，所以浏览器可以发给自己的服务端然后，由自己的服务端再转发给要跨域的服务端，做一层代理。proxyTable使用的是```http-proxy-middleware```中间件，内部用的是http-proxy

以上配置的跨域是开发环境下的，在生产环境就自动失效了，而且这样配置我们开发时访问接口时，都要写成```/apis/xxx/xxx```格式，在部署到服务器中时，我们要把/apis拿掉，才能访问到正确的url。有两种方法，一种是在开发环境中设置(通过axios的baseURL)，另一种是在服务器上修改nginx的配置设置。

###2.2生产环境去除/apis前缀

在这里详细说下第一种方式，原理是这样的：

通过检测是开发环境和生产环境，设置不同的baseURL,使生产环境和开发环境都能正确访问url

在src目录下新建一个```apis```目录,然后在apis目录下新建一个```api.config.js```文件

```js
//判断是否是生产环境
//webpack在开发环境和生产环境分别执行不同的js文件，process.env.NODE_ENV设置了不同的值，process.env.NODE_ENV在生产环境中值为'production'(这个值是在build/build.js中第4行设置的)
var isPro = process.env.NODE_ENV=== 'production'
// 如果是生产环境 我们就使用服务器的uri，如果是开发环境，我们就添加/apis前缀
module.exports = {
    baseUrl: isPro ? 'http://118.24.85.97:22222' : '/apis'
}

```

在main.js中引入这个文件，然后设置axios的```baseURL```

```js
//引入api.config.js文件，然后设置axios的baseURL
import apiConfig from './apis/api.config'
axios.defaults.baseURL=apiConfig.baseUrl
```

再来测试一下不加/apis的接口

```js
axios.get('/api')
.then(res=>console.log(res))
.catch(err=>console.log(err))

```

浏览器显示是ok的。这样我们以后使用axios访问接口就可以不加/apis了，打包后访问也不用手动去除/apis

###2.3 api统一管理

> 在vue项目开发过程中，会涉及到很多接口的处理，当项目足够大时，就需要统一管理接口。
>
> 具体方法应该挺多的，这里只介绍一种：使用axios+async/await进行接口的统一管理

一般来说，后台的接口是分模块的，例如我们后台的测试接口

* 身份认证 /api/login   /api/reg
* 用户信息 /v1/api/user

  

我们首先在src目录下新建一个apis文件夹，后台提供的所有接口都在这里定义

第二步，按照后台提供的模块新建js文件，我们新建```user.js``` ```auth.js```

第三步，引入axios，做相应的配置

在apis目录下新建一个http.js，在里面做axios相应的配置

1. 我们上文中是在main.js文件引入的axios,设置的baseURL，以上代码可以去除，改为在http.js中引入
2. 我们做的主要是：引入axios,创建一个axios的实例(实例的功能和axios一样)

```js
import axios from 'axios'
import apiConfig from './api.config'
//创建axios的一个实例
var instance = axios.create({
    baseURL:apiConfig.baseUrl,
    timeout: 6000
})


//------------------- 一、请求拦截器 后面介绍
instance.interceptors.request.use(function (config) {

    return config;
}, function (error) {
    // 对请求错误做些什么
    
    return Promise.reject(error);
});

//----------------- 二、响应拦截器 后面介绍
instance.interceptors.response.use(function (response) {
    
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

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

第四步，在```apis/xxx.js```文件中引入http.js导出的函数，拿其中一个文件```auth.js```说明

```js
//auth.js 用于定义用户的登录、注册、注销等

import req from './http.js'

//定义接口

//在这里定义了一个登陆的接口，把登陆的接口暴露出去给组件使用
export const LOGIN =params=>req('post','/api/users/login',params)
//这里使用了箭头函数，转换一下写法：
// export const LOGIN=function(params){
//   return req('post','/api/login',params)
// }

//定义注册接口
export const REG =params=>req('post','/api/users/reg',params)



```

最后一步，在需要用的该api的组件中引入并调用,我们在App.vue文件中测试下

```js
<template>
  <div>
    <h2>登录</h2>
    用户名<input type="text" v-model="user">
    密码<input type="password" v-model="pass">
    <input type="button" @click="reg" value="注册">
    <input type="button" @click="login" value="登录">
  </div>
</template>
<script>
import {LOGIN,REG} from '../../apis/auth.js'
export default {
  data() {
    return {
      user:'',
      pass:'',
      err:[]
    }
  },
  methods: {
    async reg(){
      try {
        const data = await REG({ name: this.user,pass: this.pass })
        console.log(data)
        alert(JSON.stringify(data))
        this.cleanForm()


      } catch (error) {
        console.log(error)
      }

    },
    async login(){
      try {
        const data = await LOGIN({ name: this.user,pass: this.pass })
        alert(JSON.stringify(data))
        this.cleanForm()
      } catch (error) {
        console.log(error)
      }
    },
    cleanForm(){
      this.user=''
      this.pass=''
    }
  },

}
</script>

```

注：如果要打开Login.vue,需要配置对应的路由

上面的代码引入了`auth.js`定义的api，并在对应的方法中使用。代码中用到了async/await,其实很简单，可以假设async是个标识，说明这个函数中有异步请求，await翻译为'等',后面接一个异步请求，等后面的异步请求执行完成之后，会把结果赋给`=`左边的值

>  参考链接 http://www.runoob.com/w3cnote/es6-async.html

总结一下，像上面那样定义接口虽然麻烦点，但有两个好处：

1. 代码看起来规范，所有的接口都在一个文件夹定义，不用分散的各个组件，维护起来简单，例如后台的一些url变了，改起来也方便
2. 可以做到接口一次定义，到处使用

## 3. 路由配置

> Vue Router官方文档 https://router.vuejs.org/zh/
>
> 前端路由原理：https://segmentfault.com/a/1190000018219705

### 3.1 最简配置
>  路由的配置文件在router/index.js文件中
>
>  先引入文件，再进行配置

首先在`views目录中新建以下页面`，主页(Home/Home.vue),登录页(Login/Login.vue),测试页(Test/Test.vue)

然后配置下路由


```js
import Vue from 'vue'
import Router from 'vue-router'
//@表示 src目录 webpack的配置在webpack.base.conf.js第29行 alias{'@':resolve('src')}
import Home from '@/views/Home/Home.vue'
import Login from '@/views/Login/Login.vue'
import Test from '@/views/Test/Test.vue'

Vue.use(Router)

export default new Router({
  routes: [//路由规则
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/test',
      name:'Test',
      component:Test
    }
  ]
})

```

路由规则在`routes`中进行配置,`routes`是一个数组，接受一系列路由规则，每个路由规则是一个对象，包括路径、路由名字，和路径匹配的组件，建议给每个路由加个名字，在后面可能会用到。

打开浏览器，输入相应的url查看配置的路由是否正确,不正确的话检查下自己的配置

### 3.2配置路由懒加载

> 参考文档：
>
> 路由懒加载官方文档：https://router.vuejs.org/zh/guide/advanced/lazy-loading.html
>
> webpack之mainfest解读：https://github.com/younth/blog/issues/3

当打包构建应用时，Javascript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。所以，懒加载的含义是当路由被访问时再去加载对应的js代码。

首先，不做路由懒加载的情况下，我们打包一下（切换到项目目录，执行`npm run build`）,然后会发现项目下生产了3个js文件
![image-20190304110812440](https://ws4.sinaimg.cn/large/006tKfTcgy1g0quhs52blj30u002jdgi.jpg)
简单介绍一下作用：

1. vendor.js  第三方库，一般是 node_modules里面的依赖进行打包 体积最大
2. app.js  入口js打包的结果，即我们编写的所有代码都会打包进去
3. manifest.js 主要是一些异步加载的实现方法（通过建立script方式动态引入js），内容上包含异步js的文件名和路径。

然后我们实现一下路由懒加载  `@/router/router.js`

```js
import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/views/Home/Home.vue'
// import Login from '@/views/Login/Login.vue'
// import Test from '@/views/Test/Test.vue'
// 懒加载方式
const Home=()=>import('@/views/Home/Home.vue')
const Login=()=>import('@/views/Login/Login.vue')
const Test=()=>import('@/views/Test/Test.vue')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/test',
      name:'Test',
      component:Test
    }
  ]
})

```

懒加载只是改变了一下组件的引用方式，由原来的直接引入变成异步引入，当我们访问对应的路由path时，才会加载相应的路由组件。

配置完成后再执行一次打包，结果如下：
![image-20190304112607087](https://ws4.sinaimg.cn/large/006tKfTcgy1g0quhrq6k1j30s2058jt2.jpg)

我们会发现目录中多出来3个js文件,并且`app.js`文件变小了。这说明配置了懒加载之后，app.js中其他组件的内容被抽离出来，分配到各自的js文件中。配置懒加载之后，刚开始打开页面只会加载app.js文件，只有在用户点击相应路由时，才会加载对应的js代码。当我们的业务代码非常多时，懒加载是个很好的选择。



### 3.3配置history模式

> 官方文档：https://router.vuejs.org/zh/guide/essentials/history-mode.html

配置history模式有两个原因，一是因为hash模式看很丑，二是因为预加载要用到History模式，配置非常简单,只需要配置属性`mode`的值为'history'

```js
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

不过这种方式需要后台的支持，当匹配不到url时，返回url/index.html页面

nginx配置如下

```js
location / {
  try_files $uri /index.html;
}
```



## 4. 权限管理

> 参考链接：
>
> json web token入门教程 http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html
>
> jwt官网 https://jwt.io/

###4.1 token验证

我们通过jwt进行用户认证，jwt的原理是：服务器认证以后，生成一个json对象，发回给用户.

```js
{
    "id":"001",
    "姓名":"小明",
    "角色":"管理员",
    "到期时间":"2019年3月3日12时30分"
}
```



以后用户与服务端通信的时候，都要发回这个json对象。服务器完全靠这个对象认定用户身份(一般是通过这个对象的中id去数据库请求数据)。为了防止用户篡改数据，服务器会在生成这个对象的时候，加上签名。就像这种形式：

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

关于JWT保存更新的业务流程如下：

1. 保存：登录后保存token
2. 添加：每次发送请求之前检查token是否存在，存在，添加到请求头中，发送请求
3. 更新：每次发送请求服务器返回数据之后更新token



主要逻辑包括：

1. 登录之后，在`localStorage`中保存token
2. 每次发送请求之前，使用axios请求拦截器将token放到请求头中
3. 每次发送请求服务器返回数据之后在axios的响应拦截器中更新token

```js
//1.登录之后保存token login.vue
async login(){
    const data = await LOGIN({ name: this.user,pass: this.pass })
    //保存token
    localStorage.setItem('token',data.token)
    //查看是否保存成功
    console.log(localStorage.getItem('token'))
}

```



```js
//每次发送请求之前，讲token放到请求头中 api/http.js
//---使用axios的请求拦截器，每次发送请求之前拦截一下
instance.interceptors.request.use(function (config) {
    // 给头添加token
    if (localStorage.getItem('token')){//存在token,加入头
        config.headers.authorization=localStorage.getItem('token')
    }
    return config;
}, function (error) {
    // 对请求错误做些什么

    return Promise.reject(error);
});
//完成之后，记得发送一个请求，看看是否正确添加token

//---响应拦截器，服务器响应后先到达这里
instance.interceptors.response.use(function (response) {
    if(response.data.code=='2000'){//成功响应，更新token
      if(response.data.token){
        localStorage.setItem('token',response.data.token)
      }
    }else{
        //错误处理 根据不同的状态码，进行错误处理  
    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
```

### 4.2对页面的访问权限

除了对token的操作，我们还要判断用户有没有权限访问这个页面(有些页面是用户必须登录才能访问的)，具体配置要使用Vue Router的导航守卫

> 参考链接：https://router.vuejs.org/zh/guide/advanced/navigation-guards.html

首先，我们需要在路由的匹配规则routes对象中配置下，对于需要用户登录才能访问的页面，添加一个`meta`属性用于验证

例如我们的主页需要权限才能访问，我们需要添加以下代码

```js
const router=new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      meta:{requireAuth:true},
      component: Home
    }]
})
```

之后在全局前置守卫中进行验证

```js

//在router/index.js进行配置
//在每次进行路由跳转之前进行
router.beforeEach((to,from,next)=>{//增加登录验证
  let token=localStorage.getItem('token');
  //对于需要权限的页面，如果不存在token,则跳转到登录页
  if(to.matched.some(item=>item.meta.requireAuth) && !token){
    next({
      path:'/login',
    })
  }else{
    next();
  }

})
```





## 5. 将界面交给第三方UI库

> iview官网:https://www.iviewui.com/

为节省开发时间，我们往往会使用一些第三方ui库，比如iview elementui等

我们在这里只介绍iview,其他ui库大同小异

###iview的安装与引入

####安装

```js
cnpm i iview --save
```

####按需引入组件

   官网说，需要下载插件才能按需引入，[官网说明](https://www.iviewui.com/docs/guide/start#AXYY)，但是不下好像也可以正常引入

```js
//在main.js文件中引入项目需要的组件
import {Button,Table,Message} from 'iview'
//然后注册组件
Vue.component('Button',Button)
Vue.component('Table',Table)
Vue.component('Message',Message)
```

这样注册的话太繁琐，所以需要优化一下

```js
//main.js
import {Button,Table,Message} from 'iview'
const iviewComs={Button,Table,Message}
Object.keys(iviewComs).forEach(key=>{Vue.component(key,component[key])})
```

代码都写在main.js中显得太拥挤，我们可以把代码拿出去，写成一个插件

我们在components文件夹中新建一个文件`iview-coms`，用来放iview中引入的组件

```js
//components/iview-coms.js  

import {Button,Table,Message} from 'iview'
const components={Button,Table,Message}
const install = function(Vue, opts = {}){
  Object.keys(components).forEach(key=>{
    Vue.component(key,components[key])
  })
}

export default install

```

然后在main.js中引入,`use`这个插件

```js
import iviewComs from './components/iview-coms'
Vue.use(iviewComs)
```

ok了，接下来看自定义主题

####自定义主题

   官网链接：https://www.iviewui.com/docs/guide/theme

   原理很简单，就是把ivew的less文件引入，并且覆盖掉，然后在main.js文件中引入自己的less文件

  首先，我们需要下载解析less文件的loader  ,`less`和`less-loader`，这里有个坑，下载less的时候要下载3版本以下的，不然会报一堆错误

```shell
cnpm i less@2.7.2 less-loader -D
```

下载完就ok了，不需要在webpack中进行配置，因为已经配置好了

然后，在assets/styles/base.less(没有需要自己新建)中，引入iview的样式文件,并且覆盖掉

默认变量列表：https://github.com/iview/iview/blob/2.0/src/styles/custom.less

```js
//assets/styles/base.less
//------ 引入iview样式
@import '~iview/src/styles/index.less';
//------ 覆盖iview的样式
@primary-color: #E91E63;
@error-color : #FF3300;
```

最后在main.js引入该less文件

```js
//main.js
import './assets/styles/base.less'
```

此时，引入的组件就可以在.vue文件中使用了，看一下效果：

![image-20190307150805499](https://ws4.sinaimg.cn/large/006tKfTcgy1g0u8x22wqzj30gr07v74b.jpg)

ok了。最后还要补充一下，在项目开发过程中，不可避免的要覆盖iview默认的样式，我们分为两种情况，一种是全局覆盖，一种是局部覆盖。

全局覆盖的话我们要新建一个less文件，比如叫`cover-iview.less`所有覆盖iview样式的代码都放在这里,然后在base.less中引入这个文件。

局部覆盖的话要注意不要影响到别的样式，所以要充分利用less的作用域,例如我们只需要改home页面下的iview按钮样式，我们可以这样：

```less
.home{
    .ivu-btn{
        
    }
}
```

## 6.兼容性处理

> 我们的目标是兼容到ie9,对ie8及以下的浏览器做相应的跳转处理(跳转到浏览器下载界面)
>
> 兼容性对一个程序来说是非常重要的，兼容性测试越早越好

![image-20190307151841810](https://ws3.sinaimg.cn/large/006tKfTcgy1g0u9837npyj30lk04cdgc.jpg)

###6.1 对ie8及以下浏览器的跳转处理

在项目根目录下中的html中head中加入下面代码

```html
<!--[if lte IE 8]><script>window.location.href="https://support.dmeng.net/upgrade-your-browser.html?referrer="+encodeURIComponent(window.location.href);</script><![endif]-->
```

目的是检测ie浏览器的版本，如果低于<=ie8，就跳转到下面这个页面

![image-20190307153138889](https://ws3.sinaimg.cn/large/006tKfTcgy1g0u9lkj09dj30sn0lnjzu.jpg)

###6.2 兼容ie9

> 参考链接：https://juejin.im/post/5b2868b46fb9a00e6f65f87e

####6.2.1 ES6兼容

我们把浏览器调到ie9,然后看控制台报错信息

![image-20190307154807782](https://ws3.sinaimg.cn/large/006tKfTcgy1g0ua2pvq35j30pj018jrq.jpg)

报这个错的原因是es6的新对象，新表达式，ie9不支持，为解决这个问题，我们需要引入`babel-polyfill`

```js
cnpm i babel-polyfill -D
```

安装完成之后，在main.js文件中引入

```js
import 'babel-polyfill'
```

在项目使用 `vue-cli` 生成的代码中，根目录有一个 `.babelrc` 文件，这是项目使用 babel 的配置文件。在默认生成的模板内容中，增加 `"useBuiltIns": "entry"` 的设置内容，这是一个指定哪些内容需要被 polyfill(兼容) 的设置

useBuiltIns 有三个设置选项

* `false` - 不做任何操作
* `entry` - 根据浏览器版本的支持，将 polyfill 需求拆分引入，仅引入有浏览器不支持的polyfill
* `usage` - 检测代码中 `ES6/7/8` 等的使用情况，仅仅加载代码中用到的 polyfill

####6.2.2建立自己的polyfill

加入这些代码后，工程中大部分代码已可以兼容到ie9版本,但还是会有少部分不兼容的特性，例如`requestAnimationFrame`、`classList`等。对于这些内容，我们需要自己定义polyfill来解决，在src目录下新建一个文件夹polyfill,然后在polyfill文件夹下面建一个polyfill.js，我们在polyfill.js中加入我们的兼容代码

然后在main.js中引入这个文件

```js
import './polyfill/polyfill'
```

解决兼容方式的正确姿势是：`拿到ie9浏览器下的报错信息，去goole或者baidu搜索，得到polyfill,然后加入到自己的polyfill.js文件中`



# 三、优化

##1. webpack3.x优化打包速度

我们执行一下`npm run build`，结果如下：

![image-20190307161705933](/Users/best9/Library/Application Support/typora-user-images/image-20190307161705933.png)

整个打包过程花了32s左右，现在我们的项目只是引入了相关的依赖，一些业务逻辑还没有写，打包速度就那么慢了，等到我们写完整个项目，打包速度还会继续变长，所以我们需要优化一下。

> 优化打包速度，我们修改的主要是`webpack.prod.conf.js`文件

#### 替换代码压缩工具

Webpack 默认提供的 UglifyJS 插件，由于采用单线程压缩，速度慢 ；

[webpack-parallel-uglify-plugin](https://www.npmjs.com/package/webpack-parallel-uglify-plugin) 插件可以并行运行 UglifyJS 插件，更加充分而合理的使用 CPU 资源，这可以大大减少的构建时间；

```js
//安装
cnpm i webpack-parallel-uglify-plugin -D
```

```js
//配置 webpack.prod.conf.js

//首先删除项目中的 UglifyJsPlugin插件及配置,第二次打包时提高速度，要把.cache文件加入到gitignore中
// new webpack.optimize.UglifyJsPlugin({
//   compress: {
//     warnings: false,
//     drop_console: true
//   },
//   sourceMap: true
// }),

//然后引入并使用我们刚才装的插件

```

==注意：版本控制工具提交时，要忽略.`cache`文件==

配置完后我们执行`npm run build`,发现打包速度降到了23s

![image-20190307162957635](https://ws2.sinaimg.cn/large/006tKfTcgy1g0ubaabq52j30b202i74b.jpg)



再执行一次`npm run build`,发现打包速度降到了12s

![image-20190307164513348](https://ws3.sinaimg.cn/large/006tKfTcgy1g0ubq4d17kj308p0240sr.jpg)



时间降低那么多是因为文件没有改动，直接利用了缓存中的js文件



#### happypack开启多核构建项目

一般node.js是单线程执行编译，而happypack则是启动node的多线程进行构建，大大提高了构建速度。

首先安装，

修改`webpack.base.conf.js`

```js
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
...
...
// 增加plugins
 plugins: [
  new HappyPack({
    id: 'happy-babel-js',
    loaders: ['babel-loader?cacheDirectory=true'],
    threadPool: happyThreadPool,
  })
]
...
...
// 修改对应loader
{
  test: /\.js$/,
  loader: 'happypack/loader?id=happy-babel-js',
  include: [resolve('src'), resolve('test')],
}
```

配置完成，执行`npm run build`

![image-20190307165549102](https://ws4.sinaimg.cn/large/006tKfTcgy1g0uc152zllj309l01yjre.jpg)

what fuck????  并没有提高速度  不要用这个鬼东西了 

#### hardSourceWebpackPlugin节省70%的时间

> https://github.com/mzgoddard/hard-source-webpack-plugin

```shell
#安装
cnpm install --save-dev hard-source-webpack-plugin
```

使用，在webpack.prod.conf.js中引入并使用

```js
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  context: // ...
  entry: // ...
  output: // ...
  plugins: [
    new HardSourceWebpackPlugin()
  ]
}
```

结果：

![image-20190307171310562](https://ws4.sinaimg.cn/large/006tKfTcgy1g0ucj7tx08j30ji03f0td.jpg)

注：要第二次打包才生效

总结下，使用了三个插件，我们的打包速度从30s降低到4s,awesome!

##2. webpack3.x优化首屏加载速度









# 四、部署

## nginx安装与配置







# 五、持续集成

##使用jenkins进行持续集成

