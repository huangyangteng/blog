# koa

###koa(破坏式框架)

1. 中间件、流水线
2. 数据交互
3. Cookie、session
4. Router
5. 模板



```js
cnpm i koa koa-static koa-better-body koa-convert(帮助中间件过度到3的写法) koa-router  -D

const koa=require('koa');
const router=require('koa-router');


let server=new koa();
server.listen(8080);

let r1=router();
r1.use(r1.routes());
r1.get('/',function(){})
r1.post('/',function(){})
//koa写法
server.use(async (ctx,next)=>{})
r1.get('/aaa',async(ctx,next)=>{
    //ctx.req ctx.request(封装过的)
    //ctx.res  ctx.response
    ctx.request  
    ctx.response.status=403;//设置状态码
    ctx.response.set('a',12);//自定义头  设置response.header
    ctx.response.body={a:12,b:5}//响应体
    
    //
    ctx.request.headers //请求头
})

```

//返回静态文件www/1.html

使用 koa-static-cache代替koa-static,因为后者不会压缩

```js
//const static=require('koa-static')
const static=require("koa-static-cache");
const pathlib=require('lib')  //要被淘汰

let server=new koa();
server.listen(8080);
server.use(static(pathlib.resolve('www')))  //path.resolve('www') =>/root/www 返回一个绝对路径


```

#### 处理数据

* Get   
  * ctx.request.query   a?a=12&b=5    get参数
  * ctx.params   /api/:name/:arg  路由参数

```js
const router
const koa
let server=new koa();
let r1=router();
server.use(r1.routes())
server.use(async (ctx,next)=>{
    ctx.request
})
r1.get('/api/:name/:arg',async (ctx,next)=>{
    console.log(ctx.params)
})
```

* POST 
  * 普通数据   ctx.request.fields
  * 文件    ctx.request.files

```js
const botterBody=require('koa-better-body')
const convert=require('koa-convert')

server.use(convert(betterBody(
    {
        uploadDir:pathlib.resolve('./upload'),//上传的路径
        keepExtensions:true,//保持扩展名
    }
)))

server.use(async ctx=>{
    ctx.request.fields
    ctx.request.files
})
```

//获取前台发送的cookie

```js
server.use(async ctx=>{
    ctx.cookies.get(cookie名字);
    //设置cookie
    ctx.cookies.set('b',5);//(name,value,options{maxAge,domain,expires})
})
```

#### session

```js
const session=require('koa-session');
server.use(session({
},server))//
//把keys单独做一个隐藏文件  .keys
server.keys=[
    'jsdjfjkdkjf',
    'jsdjfjkdkjf',
    'jsdjfjkdfdfkjf',
    'jsdjfjkdkjadsff',
]

server.use(async ctx=>{
    if(ctx.session['count']){
        ctx.session['count']++
    }else{
        ctx.session['count']=1;
    }
})
```

##### Koa-mysql koa-ejs koa-pug

```js
//ejs
const koa =require('koa');
const pug=require('koa-pug')

let server=new koa();
server.listen(8080);

server.use(pug())

server.use(async ctx=>{
    await ctx.render('1',{
        a:12
    })
})
```







