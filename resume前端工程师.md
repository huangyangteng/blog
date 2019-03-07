# 求职目标：前端工程师

> **求职人：[黄养滕](https://segmentfault.com/u/hyangteng/articles)**
>
> blog：[hyangteng.com](https://hyangteng.com/)
>
> email：hyangteng@gmail.com

##专业技能

> 证书：四级证书、驾驶证

* 熟悉$css3$和$html5​$的新特性，可以在工作中灵活使用 
* 熟悉$js$语言，理解原型、闭包等特性及其应用，熟悉异步编程
* 熟悉$es6$标准，包括$es6$新增api的使用以及低版本浏览器的兼容($babel$及相关插件)
* $webpack$初级使用者，可根据工作需要进行配置、优化(打包速度优化，打包体积优化)
* 熟练使用$Vue$($Vue2+VueRouter+Vuex+Fetch/Axios$)等相关技术，有相关项目经验
* 具有$Nodejs$使用经验，水平：能写业务逻辑，做服务器端渲染，高级功能不会
* **常用软件**：$iTerm2$(终端)、$git/svn/坚果云$(版本控制,云盘备份)、$vscode/vim/idea/typora$(编辑器)、$postman/charles$(接口测试,抓包)、$alfred$(效率)、$navicat$(数据库连接)、$teamviewer/ssh$(远程连接)等。

## 工作经历

###四川九次方科技有限公司

> 2016.10-2018.12
>
> 收获：对于程序的兼容性和稳定性有了一定的理解，提高了自己调试错误的能力以及避免错误的能力

 负责公司主要系统(酒店系统、餐饮系统)后台管理模块的开发，主要工作包括：
   * 根据业务逻辑，与后台共同规定业务逻辑中数据交换方式(例如发送哪些参数，参数的格式等)
   * 搭建项目并进行相应配置(jwt保存更新、api统一管理、跨域处理、编写util库处理通用业务逻辑)
   * 项目基本完成后$webpack$优化(优化打包速度$100s->25s$，优化首屏加载速度$30s->2s$)
   * 兼容$Ie9$(babel+babel-polyfill+自己编写polyfill),对$Ie9$以下浏览器做相应处理(跳转到现代浏览器下载页面)
   * 使用$nginx$配置前端静态文件服务器(反向代理后台服务器)，使用$jenkins$做持续集成(svn/git提交后项目自动部署) 

## 教育经历

###西南科技大学

> 园艺专业园林方向

主修课程：大学生计算机理工、VB程序设计、设计基础、计算机辅助设计、动态网页制作(选修)、高等数学、概率论等

## 职业规划

* 在完成本职工作的基础上，花1-2年左右的时间把计算机基础(数据结构与算法、计算机网络、数据库 基础、操作系统基础等)学好，努力提高自己的专业素养 

* 深入前端，去github阅读源码，学习Vue、Jquery、underscope等库的实现原理及设计思想<span style="color:transparent">lalallalalalalalal</span>==↓==

  

##个人信息

```javascript
class Hyangteng{
    constructor(){
        this.name='黄养滕';                     this.age=22;
        this.tel='15196235249';                 this.qq='2952510969';
        this.email='hyangteng@gmail.com';        this.address='四川省成都市武侯区';
		this.instance=null;
    }
    static getInstance(){
        if(!this.instance) this.instance=new Hyangteng();
        return this.instance
    }
}
```

