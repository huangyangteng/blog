#笔记2018-9-2

##1 。问题

1. 如何区分null undefined 和空字符串

   ```js
   let a=xxx;
   !a && typeof a=='object'
   !a && typeof a=='undefined'
   !a && typeof a=='string'
   ```

2. base64

   编码方式：编码任何你需要的资源

   但凡出现地址的地方，都有base64

   （小图片）图片转成base64，减少http请求

   大图片不要变成base64，因为图片转化成base64,图片会变大

3. restful

   一种习惯，简化后台接口的编写

   1. 统一      访问不同数据，使用统一的接口
   2. method+url  区分接口

4. Decorator 装饰者模式

   1. js天然符合装饰者模式

   2. 对象生成之后，再给对象加东西 加装饰

   3. ```js
      let oDate=new Date();
      oDate.show=function(){
          
      }
      ```

   4. 在java里面用的多

## 2. websocket

1. 双工
2. html5里面带的 需要兼容
3. 用的非诚多  socket.io

```js
cnpm i socket.io 
```

---

socket.io 库 

后台

```js
const http=require('http');
const io=require('socket.io');

//1. 先创建http服务
let httpServer=http.createServer();
httpServer.listen(8080);

//2. 创建websocket服务
let wserver=io.listen(httpServer);
//监听
wsServer.on('connection',function(sock)
    sock
}
```



前端

```js
//新建一个sock对象 连接
let sock=io.connect('ws://localhost:8080/');
```





---

Sock.emit() 发送 名字，数据1，数据2

Sock.on() 接受 名字，回调函数















































