```js
let that=this;
wx.login({
    success(){
        //执行刷新页面的函数
        that.onPullDownRefresh()//应该是这样调用的，我在vue中都是这样
    }
})

//如果不可以的话，你可以把刷新页面的代码写在一个函数里，登录成功后调用那个函数
Page({
    onLoad(){
        //第一步，要判断用户是否已经登录过，登录了直接去获取信息
        //if (res.authSetting['scope.userInfo'])是判断用户是否授权的，不是登录，登录需要使用别的方式判断，
        
        
    }
})

```

![image-20180711145502874](/var/folders/8p/w9p5cj3n4wxfdwnsxj16rkcc0000gn/T/abnerworks.Typora/image-20180711145502874.png)





* 未授权（说明未登录）-》登录
* 已授权（不知道是否登录）
  * 未登录  登录-》获取数据
  * 已登录 -》获取数据