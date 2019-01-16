# 牛客网使用js刷题处理输入输出

https://www.jianshu.com/p/70a04abd0823

https://blog.csdn.net/zgljl2012/article/details/48321171

https://www.nowcoder.com/discuss/276

node.js

```js
const readline=require('readline');
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
})
rl.on('line',res=>{
    let tokens=res.split(' ');
    console.log(parseInt(tokens[0])+parseInt(tokens[1]))
})
```

读取多行输入

```js
let countLine=1;
let tokens=[];
rl.on('line',line=>{
    tokens.push(line);
    if(countLine==3){//输入了三行
        
        
    }
})
```



javascript

```js
var a, b;
var solveMeFirst = (a,b) => a+b;
while((a=readInt())!=null && (b=readInt())!=null){
    let c = solveMeFirst(a, b);
    print(c);
}
```

```js

while(line=readline()){
    var lines = line.split(' ');
    var a = parseInt(lines[0]);
    var b = parseInt(lines[1]);
    print(a+b);
}
```

