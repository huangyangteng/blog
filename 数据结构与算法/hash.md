# hash

[TOC]

##Hash function的性质

###1.性质：

1. 输入的值相同，一定产生相同的输出
2. 输入的值不同，可能产生相同的输出
3. 输入是无穷大的，但输出有限 
4. 输出是离散的    "huang1" 和"huang2"产生的结果是随机的

推论：如果一个hash函数在S域上是随机的，那个在S%x域上也是随机的

### 2. hash函数的结构

经典结构： 

```java
一个数组arr，假设长度为1000
一个字符串经过hash function之后产生一个值，产生的值%arr.length,得到0-arr.length中的一个值，放入数组中 数组后面串链表 如果计算出相同的值，放入链表中
扩容问题： 当数组中链表的长度大于某个特定值时，就需要扩容，扩容的时候储存的每一个值都需要重新计算
```



java里面的结构：

```java
与经典结构不同的是每个数组后面串的是一颗红黑树
```



###2.如何产生多个hash function

如何产生1000个独立的hash函数

假如hash产生16位的16进制值，把产生的hash code截取，高8位称为h1,低8位称为h2

h3=h1+1*h2    h4=h1+2*h2    .....  h1000=h1+1000*h2

也可以使用两个hash函数产生

##HashMap的使用(java)

RandomPool结构的设计(关键点：如何填洞)

* insert(key) 做到没有重复元素
* delete(key)
* getRandom()方法 概率随机得出一个数
* 时间复杂度都为O(1)

```java
//思路 ：使用两个hashMap  一个存key,size  一个存size key 一个变量size记录元素数
//假如没有delete操作，getRandom()随机产生一个就可以使用  map2.get(Math.random()*size)   
//但是有了delete操作，删除了中间的数，就存在洞了  如何解决？
//填洞思想：  删除元素时  delete(key)   
boolean delete(key){
    if(map1.has(key)){//1.判断有没有这个key
       int index=map1.get(key); //2.获得key对应的index
       int dKey
       //让最后一个元素去填坑  然后size-- 
        
       
    }else{
        return false;
    }
}
```





##布隆过滤器及使用场景

##一致性哈希

##并查集