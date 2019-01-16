#express

安装依赖 

```js
cnpm i express 
```



### 两个概念

* 中间件
* router

####server.js

```js
const express=require('express');

let server=express();
server.listen(8080);

//get方法+路径 
server.get('/a',function(req,res,next){
	res.send([1,2,3])    //res.write()只能返回字符串和buffer send什么都可以返回
    res.send({'msg':'hello'})
})
//post方法 访问upload
server.post('/upload',function(){})
//use 不区分是get还是post 通用
server.use('xxx')


```

####express返回文件

```js
//中间件  express.static() 返回静态文件
server.use(express.static(' www/'))
//访问localhost://8080/1.html   自动到www/1.html
```

####中间件：

1. 插件 -补充框架功能
2. 流水线  重用、分工、顺序

```js
server.get('/a',(req,res,next)=>{
    console.log('aaa')
    next()
})
server.get('/a',(req,res)=>{
    console.log('bbb')
})
```

#### sendFile

根据条件返回

```js
const pathlib=require('path')
//path 用来解析路径    pathlib.resolve('./a.txt)   相对路径=>绝对路径

server.get('/a',(req,res)=>{
    res.sendFile(pathlib.sendFile(pathlib.resolve('./a.txt')));
})
```

####sendStatus

res.sendStatus(404) 返回状态码   === res.writeHeader(404)+res.write('Not Found')+res.end()

#### 重定向

res.redirect('http://www.baidu.com')

#### 数据交互

get  req.query  就是get数据

传参方式

/article/123   req.params

/article?id=1111   req.query

```js
server.get('/a',(req,res)=>{
    console.log(req.url,req.query)
    //req.query    localhost://a?a=12&b=5     req.query === {a:12,b:5}
})
```

post  

* 普通post      body-parse
* 文件post      multer

```js
cnpm i body-parser      
const body=require('body-parser');

server.use(body.urlencoded({extended:false}));


server.post('/upload',(req,res)=>{
    console.log(req.body)  //数据在req.body中
})
```

```js
//文件
multipart/form-data
const multer=require('multer');
server.use(multer.({dest:'upload/'}).any());  //上传文件的路径
server.post('/upload',(req,res)=>{
    console.log(req.body)  //普通数据在req.body中
    console.log(req.files)  //文件数据在req.files中
})


```

#### cookie-session

cookie-parser

```js
cnpm i cookie-parser cookie-session -D
const cookieParser=require('cookie-parser')  //防止篡改
const 
server.use(cookieParser({
    'lalalalala'//secret
}));
server.get('/a',(req,res)=>{
    console.log(req.cookies);   //接受cookie
    console.log(req.signedCookies)  //带签名的cookie
    //怎么发一个cookie   cookie是http头的一部分
    res.cookie('b',5,{signed:true})  //res.cookie是express带的方法 res.cookie(名字,值，选项)
    
    res.send('ok')
})

```

Cookie-session

session劫持

Sess_id拿走

防御：

1. session有效期 10分钟
2. 签名

```js
const cookieSession=require('cookie-session')

server.use(cookieSession({
    keys:['asfdjfdkfj','djfkdjfj','fjjgjdajdjkg','jggdjjwjsjkaj']
}))

server.get('/a',(req,res)=>{
    if(!req.session['count']){
        req.session.count=1;
    }else{
        req.session.count++;
    }
    res.send(第)
    console.log(req.session)
})

//浏览器关闭，session就消失
```



RESTFUL api风格

```js
其他风格：
http://ip:port/youapp/userInfo?userId=123
http://ip:port/youapp/newUser
http://ip:port/youapp/deleteUser?userId=123
http://ip:port/youapp/updateUser?

restful api  
http://ip:port/youapp/user/123.html

```







---







### 路由

拆分，本质上就是一个switch(url) 根据地址不同，调用不同的代码

```js
const express=require('express');

let server=express();
server.listen(8080);

let articleRouter=express.Router();
articleRouter.get('/:id',(req,res)=>{
    res.send('文章内容');
})
articleRouter.get('/:id/comment',(req,res)=>{
    res.send('文章评论');
})

//子路由   /article/aaa/a


let userRouter=express.Router();
userRouter.get('')

server.use('/article',articleRouter);//有关article都给articleRouter处理
server.use('/user',userRouter);


```

改进，页面分开    router/article.js router/user.js     

### 服务器渲染

* 后端渲染（组装）：把html生成出来
* 前端渲染（组装）：html生成出来
* 浏览器渲染：输入url->加载->css、js、img->渲染（画出来）

pug 破坏式

ejs 非破坏式

#####pug

Pug.js

```js
const pug=require('pug')
console.log(pug.renderFile('template/pug/1.pug',{
    pretty:trues,//美化,
    arr:[1,2,3,4,5]
    
}))
```

Template/pug/1.pug //缩进规定层级

```jade
doctype
html
  head
    meta(charset="utf-8")
    link(rel="stylesheet",href="css/main.js")
  body
    div#div1.active.page
    ul.list
      each a in arr
        li
```



#### ejs

```js
const ejs=require('ejs');
ejs.rendFile('./template/ejs/1.html',{
    a:12,b:5,
    str:'我交<strong>dd</strong>',
    arr:[12,3,12,3,0]
}).then(res=>{
    console.log(res)
})
```



```ejs

<%=a+b %>   =是转义输出
<%-str %>   -是非转义输出
//for
//循环
<% for(let  i=0;i<arr.length;i++){ %>
<li><%=arr[i]%></li>
<% } %>
    
<% arr.forEach(item=>{%>
<li><% =item %></li>
<% }) %>
//公共的东西 头 footer
header.html
footer.html
//引入公共部分
<%- include('header.html')%>  include也可以使用变量
<%- include('footer.html')%>
```























