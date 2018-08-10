## 4. 读取用户输入

```java
Scanner in=new Scanner(System.in);
System.out.println(in.nextLine());//让in去做nextLine()这个动作
```

* alt+/  代码自动补全，自动引入需要的包,输入Scan按下alt+/,代码就自动补全

###问题：

* ''和""有什么区别

```java
Scanner in =new Scanner(System.in);
int price=0;
price=in.nextInt();
System.out.println(price);

```

定义常量

```java
final int bill=100;
```

