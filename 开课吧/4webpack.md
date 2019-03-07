# webpack

umd规范，通用的规范

![image-20190226095547237](https://ws4.sinaimg.cn/large/006tKfTcgy1g0jlbggv6ij30yu0tstn7.jpg)

##webpack下载  

npm install webpack@3.12.0 -D  

可以下载到全局，可以下载到node_modules包中  

复习一下import export语法



## webpack命令

webpack 入口文件  输出文件

```shell
webpack ./main.js  ./build.js
```



## webpack配置

新建一个webpack.config.js文件

```js
module.exports={
    //入口
    entry:{
        //可以有多个入口，也可以只有一个，如果有一个就默认从这个入口开始分析
        "main":'./main.js'
    },
    output:{
        filename:'./build.js'
    },
    watch:true,//监听文件的改动，文件发生改变自动编译
}
```

webpack  默认==webpack --config webpack.config.js

自定义

webpack --config webpack.dev.config.js

## 处理css文件

cnpm i css-loader   style-loader  -D

```js
module.exports={
    //入口
    entry:{
        //可以有多个入口，也可以只有一个，如果有一个就默认从这个入口开始分析
        "main":'./main.js'
    },
    output:{
        filename:'./build.js'
    },
    watch:true,//监听文件的改动，文件发生改变自动编译
    //包含各个Loader，对各种文件进行处理
    module:{
        loader:[
            {
                test:/\.css$/,//正则
                loader:'style-loader!css-loader'//先右后左
            }
        ]
    }
}
```

## 处理图片

url-loader  file-loader

```js
module.exports={
    //入口
    entry:{
        //可以有多个入口，也可以只有一个，如果有一个就默认从这个入口开始分析
        "main":'./main.js'
    },
    output:{
        filename:'./build.js'
    },
    watch:true,//监听文件的改动，文件发生改变自动编译
    //包含各个Loader，对各种文件进行处理
    module:{
        loader:[
            {
                test:/\.css$/,//正则
                loader:'style-loader!css-loader'//先右后左
            },
            {
                test:/\.(jpg|png)$/,
                loader:'url-loader?limit=40000'
            }
        ]
        
    }
}
```

## 处理less文件

less  less-loader

less-loader依赖Less

```js
module.exports={
    //入口
    entry:{
        //可以有多个入口，也可以只有一个，如果有一个就默认从这个入口开始分析
        "main":'./main.js'
    },
    output:{
        filename:'./build.js'
    },
    watch:true,//监听文件的改动，文件发生改变自动编译
    //包含各个Loader，对各种文件进行处理
    module:{
        loader:[
            {
                test:/\.css$/,//正则
                loader:'style-loader!css-loader'//先右后左
            },
            {
                test:/\.(jpg|png)$/,
                loader:'url-loader?limit=40000'
            },
            {
                test:/\.less$/,
                loader:'style-loader!css-loader!less-loader'
            }
        ]
        
    }
}
```

## 配置输出的目录

```js
const path=require('path')
modules.exports={
    
    output:{
    	path:path.resolve('./dist'),//相对路径转绝对路径
        filename:'./build.js'
    }
}
```



## html-webpack-plugin插件

```js
var path  = require('path');

const HtmlWebpackPlugin  = require('html-webpack-plugin')
// webpack ./main.js  ./build.js
module.exports = {
	// 入口
	entry:{
		// 可以有多个入口，也可以有一个，如果有一个就默认从这一个入口开始分析
		"main":'./src/main.js'
	},
	output:{
		path:path.resolve('./dist'),//相对转绝对
		filename:'build.js'
	},
	watch:true,//文件监视改动 自动产出build.js
	// 声明模块
	// 包含各个loader
	module:{
		loaders:[
			{
				// /遇到后缀为.css的文件，webpack先用css-loader加载器去解析这个文件
				// 最后计算完的css，将会使用style-loader生成一个内容为最终解析完的css代码的style标签，放到head标签里。
				// webpack在打包过程中，遇到后缀为css的文件，就会使用style-loader和css-loader去加载这个文件。
				test:/\.css$/,
				loader:'style-loader!css-loader'
			},
			{
				test:/\.(jpg|png|jpeg|gif|svg)$/,
				loader:'url-loader?limit = 60000'
			},
			{
				test:/\.less$/,
				loader:'style-loader!css-loader!less-loader'
			}

		]
	},
	plugins:[
		// 插件的的执行顺序与plugins数组的索引有关
		new HtmlWebpackPlugin({//自动生成index.html文件并且引入js文件
			template:'./src/index.html',//参照物  自动把template输出到出口中
		})

	]
}
```

## webpack-dev-server

npm i webpack-dev-server@2.9.0 -D

使用webpack-dev-server在package.json中

```shell
webpack-dev-server --open --hot --inline --config ./webpack.dev.config.js
```

![image-20190226143900436](https://ws3.sinaimg.cn/large/006tKfTcgy1g0jti3pqevj31cn0u0gz6.jpg)



## es6代码的解析





![image-20190226144008301](https://ws1.sinaimg.cn/large/006tKfTcgy1g0jtjacnx4j30w80u07vz.jpg)

```shell
cnpm i babel-core babel-loader babel-preset-env babel-plugin-transform-runtime
```



```js
 {
    // 处理es6,v7,8
    test: /\.js$/,
    loader: 'babel-loader',
    exclude:/node_modules/, //排除node_modules下面的js文件
    options: {
        presets: ['env'], //处理关键字
        plugins: ['transform-runtime'], //处理函数
    }
}
```



针对node_modules下面的js文件，要排除



## 解析vue文件

```js
 {
    test: /\.vue$/,
    loader: 'vue-loader'
}
```























==setImmediate   阮一峰event-loop   vue对dom异步更新机制，提高dom渲染机制==















