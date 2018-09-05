# 笔记2018-9-3

[TOC]



websocket

socket.io

1. 兼容的  ？  怎么做到的
2. 可以传输二进制类型的数据

http--只能传输文本类型的数据

socket.io

1. 怎么用
2. 聊天室
3. 视频点播



---

## 1. 后台Node

1. 原生Node.js

中间层语言  小型项目、工具

//对模块的掌握程度

```js
//遵守http协议
const http=require('http');




let server=http.createServer((req,res)=>{
	//有人请求就会执行回调函数
    res.write('hello');
    //request   请求-输入  请求信息--哪个地址、时间、ip、方法 
    //response 	响应-输出  
    //req.url 请求的url
    //req.method
    
    
    
    res.end();
});

//等待客户端连接  
server.listen(8080);

```

res.write    ->body

res.writeHeader    ->header

端口--数字：区分不同的服务   

每种服务都有默认的端口

Web 80 



fs模块  文件系统   

```js
const fs=require('fs');

fs.readFile('1.txt',(err,data)=>{
    if(err){
        console.log('读取失败')
    }else{
        
    }
    
})
fs.writeFile('2.txt','lalallala',err=>{
    if(err){
        
    }else{
        
    }
})
```

Buffer    特殊的数据类型 二进制的大数组





---

客户端可以读取的目录有限

```js
fs.readFile(filePath,(err,data)=>{
    if(err){//返回错误页面
        fs.readFile('./http_errors/404.html',(err,data)=>{
            if(err){
        		res.writeHeader(404);
                res.write('404 not found');        
            }else{
                res.writeHeader(404);
                res.write('404 not found');        
            }
            res.end();
        })
        
    }else{
        res.write(data)
    }
})

```





---

## 2. websocket

1. 原生很麻烦

2. socket.io能兼容到ie6 ?怎么做到的

3. 天然跨域


```js
cnpm init -y
cnpm i socket.io -D

//先创建http服务


//创建websocket服务
const wsServer=io.listen(httpServer);
//监听连接
wsSerVer.on('connection',sock=>{
    
})

```



```js
前台
//引入socket.io.js

let sock=io.connect('ws://localhost:8080/');
```







---

package.json作用

1. 存储依赖
2. 在scripts里面可以写脚本





## 3. websocket聊天室（简版）

功能：

1. 用户注册、登录
2. 用户发言-》发送给其他人
3. 离线消息

数据库

1. 用户数据
2. 消息数据

---

数据库分类：

1. 关系型数据库 --mysql oracle    功能强大9，性能低7.5
2. 文件型数据库 （SQLite） 简单所有的数据存在一个文件里面 数据量有限 小型应用 （手机通信录，通信记录）
3. 文档型(mongodb) 可以直接存储对象本身 不够严谨，性能偏低（6.5）
4. 空间型 --坐标、位置  GIS



Nosql：性能（9）追求性能

Redis    Memcached   Bigtable Hypertable

---

Mysql 

 

服务端     

​	电脑上安装mysql 密码313265@mysqL

客户端

	node操作mysql

库—文件夹 管理用的，本身不能存数据

表--文件 存数据

​	字段（列）

​	行

类型

​	数字 

​		整数 int(21亿或者43亿) tinyint (-128-127 || 0-255) 

​		浮点数 float(小数点后8位)   double （小数点后308位）

​	字符串

​		小字符串 varchar(255)

​		大字符串 text(2g)



​	主键(index+unique)：

  		1. 唯一
  		2. 性能高 对主键进行查询，性能高

存年龄 tinyint

---

用户表

| 名       | 类型    | 长度 | 不是null | 主键 |
| -------- | ------- | ---- | -------- | ---- |
| ID       | int     |      | true     | true |
| username | varchar | 32   | true     |      |
| password | varchar | 32   | true     |      |
| online   | bit     | 1    | false    |      |





```js
cnpm i mysql -D

//连接到服务端
const mysql=require('mysql');
//创建一个连接
let db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'313265@mysqL',
    database:'chat_room'
})

//连接池  解决数据库拥塞
let db=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'313265@mysqL',
    database:'chat_room',
    
})



```



数据库的语言：SQL

四大语句(crud)-增删改查

```js
//查询
db.query('sql语句',(err,data)=>{
    if(err){
        console.log(err)
    }else{
        console.log(data);
    }
})

```





































