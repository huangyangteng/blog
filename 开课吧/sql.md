#笔记2018-9-4

[TOC]



## 1. sql语言

增删改查

增

	INSERT INTO 表 (字段列表) VALUES (值)

```mysql	
INSERT INTO user (username,password,online) VALUES ('xiaott','123455',0);
```

删

	DELETE FROM 表 WHERE 条件;

```mysql
DELETE FROM user WHERE ID=3;
```

改

	UPDATE 表 SET 字段=新的值，字段=新的值 WHERE 条件

```MYSQL
UPDATE user SET password='111111' WHERE ID=2;
```

查

	SELECT 字段的列表 FROM 

```mysql
SELECT * FROM user
SELECT username,online FROM user
```

性能优化：

1. 切记写入操作是性能的瓶颈
2. 但凡是带索引的性能都低

## 2. 小练习

写几个接口



---

定接口

用户注册

	/reg?user=xxx&pass=xxx
	
	返回： {"code":0,msg:"信息"}

用户登录

	/login?user=xxx&pass=xxx
	
	返回：{"code":0,msg:"信息"}

---

请求文件：

	/1.html
	
	/index.html	

请求接口：

	/reg?
	
	/login?	



---

解析数据   /reg?user=xxx&pass=xxx

url模块 系统模块

```js
const urlLib=require('url');

let url=''
urlLib.parse(url,true);
Url{
    host:'',
    search:'',
    path:'',
        ...
}
    
    
pathname 地址 /reg
query  ？后面的数据
```



---



```js
cnpm i mysql socket.io -D

==== server.js
//用到的模块
http,fs,mysql,io,url

//0 。链接数据库
let db=mysql.createPool({
	    
})



//1.http服务器
let httpServer=http.createServer((reg,res)=>{
    let path=url.pathname;
    let query=url.query;
    if(req.url='/reg'){//注册
    	let {user,pass}=query;
        if elseif else
        //1. 判断数据是否规范
       	if(//)
        
        //2. 检验用户名是否重复
        
        //3. 插入
        
        
    }else if(req.url='/login'){
        let {user,pass}=query;
        //检验格式
            检验用户名是否存在
            用户名或者密码错误
            改变状态
            
    }else{
        fs.readFile(``)
    }
    
    
});
httpServer.listen(8080);


//2. websocket服务器



```



## 3.websocket里面实现逻辑

---

定义接口

'reg' ,user,pass  => 'reg_ret',code,msg

'login',user,pass => 'login_ret',code,msg

'msg',txt        ->  'msg_ret',code,msg

			->  'msg',name,txt

```js
wsServer.on('connection',sock=>{	
    //存下来当前用户的名字和id
    let cur_username='';
    let cur_userID='';  
    //注册
    sock.on('reg',(user,pass)=>{
        //1.校验数据
        if...elseif...else
        sock.emit('reg_ret',1,'用户名不符合规范');
        //2.校检成功
        db.query('reg_ret',0,'注册成功')
    })
    //登录
    sock.on('login',(user,pass)=>{
        //校验数据
        //用户信息
        //改在线状态
    })
    //判断离线  连接断开之后，就认为离线
    sock.on('disconnect',function(){
        // onlne变成0
        //用户名字 id清0
        cur_username='';
        cur_userId='';
    })
    //发言
    sock.on('msg',txt=>{
        //校验
        //成功之后广播给所有人
        //需要一个数组  ,每登录一个，增加一个,离线一个，删除一个
        
    })
    
    
})

```







前台

```js
let sock=io.connect('ws//localhost:8080')

//发送数据
sock.emit('reg',user,pass);
sock.on('reg_ret',(code,msg)=>{
    
})
//登录

//消息
sock.on('msg_reg')
sock.on('msg',txt=>{
    
})

```



1. on有个问题！！！注意要把on放在外面
2. websocket调试问题 不好调试









----

下次课 讲 h5应用，jsonp














