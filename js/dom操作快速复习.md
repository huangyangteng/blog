# javascript dom面试知识点

> dom将html文档或者xml文档描绘成一个多层次节点构成的树形结构。节点分为几种不同的类型，每种类型分别表示文档中不同的信息。常用的节点有：元素节点，文本节点等。

## 1.dom结构-两个节点之间存在哪些关系以及如何在节点之间任意移动

dom结构如下图所示：

![image-20180810141612959](/var/folders/8p/w9p5cj3n4wxfdwnsxj16rkcc0000gn/T/abnerworks.Typora/image-20180810141612959.png)

## 2. dom操作-如何添加、移除、移动、复制、创建和查找节点等



* 添加节点

  * appendChild() 向父元素的最后插入一个节点，返回被插入的节点
  * insertBefore() 在某个元素之前插入节点，两个参数，参照的节点，插入的节点

* 替换节点

  * replaceChild()  两个参数：要插入的节点和要替换的节点

* 移除节点

  * removeChild() 一个参数，要移除的节点

  **注意：以上四个方法操作的都是某个节点的子节点，也就是说使用这几个方法之前，要先取得父节点**

* 复制节点

  * cloneChild()  传入一个布尔值的参数，决定是否执行深复制。为true时，执行深复制，也就是复制节点以及整个子节点树，为false时，执行浅复制，只复制节点本身。

* 创建节点

  * 创建元素节点  document.createElement()  传入要创建的节点类型
  * 创建文本节点 document.createTextNode() 传入文本作为参数

* 查找元素节点

  * getElementById()  根据id获取元素，如果有相同id的元素，只获取第一个
  * getElementsByTagName()  根据标签名获取元素 返回一个包含0个或多个元素的NodeList集合
  * querySelector() 传入一个css选择器作为参数，返回选中的第一个元素
  * querySelectorAll()  传入一个css选择器作为参数，返回选中的所有集合