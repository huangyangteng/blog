# 我的Css规范化

## 1. 开头添加注释

```css
/*文档信息(文件的依赖关系，覆盖关系、命名空间约定)
1. 文件依赖
	reset.css 浏览器样式重置
	base.css 基本样式定义
2. 命名空间约定
	所有的class使用 'h-' 作为命名空间，比如 h-nav
3. 覆盖关系 
	为body添加class，如需覆盖使用该class
	<body class="homepage">
    .homepage{
        .h-nav{

        }
    }
*/

/*内容目录  区块划分
*/

/*配色方案
*/
```

### 2. 类名使用小写字母加连字符（nav nav-night），添加样式一律使用class，不使用id（id用于js操作），如果一个class是用于js的，添加'js-'前缀。

### 3. 使用层叠关系去覆盖样式表，不使用!important



