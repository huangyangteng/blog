##fetch

官方封装的ajax

怎么用？

```js
let res=fetch('localhost:8080/list');  失败
console.log(res)    res是一个Promise
let res=(await fetch('localhost:8080/list')).json();  失败
let res= await (await fetch('localhost:8080/list')).json();  成功
```



```js
try{
    this.items=(await this.ajax('http://localhost:8080/list')).data
}catch(e){
    alert('数据加载失败，请刷新重试')
}
```

