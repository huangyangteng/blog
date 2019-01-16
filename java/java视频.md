#java视频

> 任向东
> 
<style>
	b{
        font-size:1.5em;
        color:red;
	}
</style>

## 1.构造函数

1. 构造函数可以有return，用于结束初始化
2. 构造函数初始化 （使用private修饰），只在本类中使用。
   1. 可以阻止外界初始化

##2 final

1. final关键字 可以修饰类、方法、关键字  
2. final修饰类，类不能被继承
3. final修饰方法，方法不能被override
4. final修饰的变量是一个常量，只能赋值一次 
   * 常量需要大写，如果有多个字母，需要使用下划线

应用

```java
//单例模式，实例变量添加final
class single{
    private static final Single SINGLE_INSTANCE=new Single();
    private Single(){}
    public static Single getInstance(){
        return SINGLE_INSTANCE;
    }
}
```

全局常量

public static final int PI=3.14;

## 3.抽象类

1 抽象

描述：狗 叫

描述：狼 叫

狗和狼不是is-a关系，但是具有共性，所以就可以向上抽取 -》犬科

2 特点：

1. 抽象方法一定定义在抽象类中，都需要abstract关键字修饰
2. 抽象类不可以实例化。不能用new关键字创建对象
3. 只有子类覆盖了所有的抽象方法后，子类具体化，子类就可以创建对象
   1. 如果没有覆盖所有的抽象方法，子类还是一个抽象类

```java
//描述一个事物，却没有足够的信息，将这个事物称为抽象事物 水果、猫科、犬科
//犬科
abstract class Canine{//只有方法的声明，没有方法的实现，后面是分号结束
    abstract void hou();//有这个行为，但是具体怎么叫不具体，具体怎么叫由具体的类来实现                                             
    
}
//狗
class Dog extends Canine{
    void hou(){
        System.out.println("wangwang");
    }
}
//狼
class Wolf extends Canine{
    void hou(){
        System.out.println("awuuuuuuu");
    }
}

```

3.问题

* 抽象类中有构造函数吗？
  * 有，抽象类的构造函数虽然不能给抽象类对象实例化，因为抽象类不能创建对象
  * 但是抽象类的构造函数可以给子类的对象实例化

* 抽象类一定是个父类吗？

  * 是的

* 抽象类中可以不定义抽象方法吗？
  * 可以
  * 仅仅是让该类不能创建对象

* abstract和哪些关键字不能共存？

  * final 修饰的类不能有子类 abstract修饰的类必须有子类
  * private  私有不能被覆盖
  * static 静态在静态区0

  4实例

  需求：程序员 姓名、工号、薪水、工作内容

            项目经理 姓名、工号、薪水、工作内容、奖金

  ```java
  -bstract class Employee{
      private String name;
      private Integer id;
      salary;
      abstract work();
      Employee(String name,Integer id,double salary){
          this.name=name;
          this.id=id;
          this.salary=salary;
      }
      
          
  }
  class Programmer extends Employee{
      Programmer(String name,Integer id,double salary){
          super(name,id,salary);
      }
      public void work(){
          
      }
  }
  
  ```



##4. 接口

理解：抽象类中所有的方法都是抽象的，这时，可以把抽象类用另一种形式表示--接口

```java
//定义接口
interface Inter{
    public static final int NUM=1;
    public abstract void show1();
    public abstract void show2();
}
//编译后生成Inter.class文件
//接口中的成员和class定义不同之处
//接口中常见的成员有两种 1.全局常量  2. 抽象方法 而且都有固定的修饰符 成员都是public修饰的


```

接口的特点

* 接口不能实例化
* 需要覆盖了接口中的所有抽象方法的子类才可以实例化
* 接口是用来被实现的

```java
//类与接口之间的关系是实现关系
class Demo implements Inter{
    public void show1(){
        
    }
    public void show2(){
        
    }
}
```



接口的好处 解决了什么问题

多继承：让子类具有更多的功能。弊端：调用的不确定性

好处1：java通过接口，解决多继承的问题 将多继承转化为多实现

```java
interface InterA{
    void show1();//省略了public abstract关键字
}
interface InterB{
    void show2();
}
class SubInter implements InterA,InterB{
    public void show1(){
        
    }
    public void show1(){
        
    }
}
```

好处2：避免了单继承的局限性

```java
//继承是为了获得体系的基本功能，但要拓展功能可以通过实现接口来完成
class Fu{
    void show(){
        
    }
}
interface Inter{
    void show1();
}
//拓展一些功能 一个类在继承的同时，还可以实现多个接口
class Zi extends Fu implements Inter{
    public void show1(){//实现接口的功能
        
    }
}
```





类与类之间 继承关系 is a            <b style="color:red">了解</b>

类与接口之间 实现关系    Like a

接口与接口之间  继承关系   接口可以多继承

```java
interface Inter1{
    void show();
}
interface InterA{
    void showA();
}
interface Inter2 extends Inter1,InterA{
    
}
```



类如何使用接口中的部分方法？

```java
interface Inter{
    void show1();    
    void show2();
    void show3();
}
//DemoA只需要使用show1功能
abstract class Demo implements Inter{//没有抽象方法的抽象类，方便创建接口的对象
    void show1(){};
    void show2(){};
    void show3(){};
}
class DemoA extends Demo{
    void show1(){
        
    }
}
class DemoB extends Demo{
    void show1(){
        
    }
}
```

####总结：抽象类和接口之间的区别

类与类之间是继承关系 is-a

类与接口之间是实现关系 like-a

抽象类中可以定义抽象和非抽象方法

接口中定义的都是抽象方法，必须实现才可以

类：实现事物的一般功能

接口：用于定义事物的额外功能

## 5多态

多态：多种形态    重载本身就是函数的多态

	重点是：对象的多态性

多态在程序中的体现：父类的引用或者接口的引用指向了子类中的对象

```java
abstract class Animal{
    abstract void eat();
}
class Dog extends Animal{
    void eat(){
		System.out.println("骨头");        
    }
    void lookHome(){
        
    }
}

//Dog a=new Dog();          狗实例是狗类型
Animal a=new Dog();       狗实例既是狗类型，也是动物类型    向上转型 狗->动物
a.eat();



```

多态的好处：

面对共性类型，所有的子类对象都可以接受，提高了代码的拓展性

多态的弊端：

不能使用子类的特有方法

多态的前提：

1. 必须有关系，继承、实现

2. 通常有覆盖


Animal a = new Dog();  //向上转型

向上转型 狗-》动物     好处：隐藏了子类型，提高了代码的扩展性

       弊端：只能使用父类中的功能，不能使用子类中特有的功能

使用时机：如果不需要面对子类型，需要提高扩展性，或者使用父类的功能即可完成操作，就使用向上转型

如果需要使用子类的特有功能

，

Dog d =(Dog)a; //向下转型

向下转型的好处：可以使用子类型中的特有功能   

                 弊端  面对具体的子类型。向下转型有风险，容易出问题
    
    		   想要安全，必须进行判断、判断一个对象是否匹配某一类型，需要使用关键字 instanceof

```java
if(a instanceo  Dog){
    Dog d=(Dog)a;
}
```







<b style="font-size:30px;color:red">转型过程中，只有子类对象在做类型的变化</b>



练习：

1. 笔记本电脑运行。  
2. 需要一个鼠标，说明笔记本中多了一个使用鼠标的功能
3. 如果还想使用其他设备，例如键盘、u盘，可以通过在笔记本对象中继续定义useKey等方法来完成，但是出现了问题：每增加一个设备，都需要不断地改动笔记本中的内容

```java
//阶段1
class NoteBook{
    public void run(){}
}
//阶段2
class NoteBook{
    public void run(){}
    //定义使用鼠标功能，鼠标不确定，定义成参数
    public void useMouse(Mouse m){
        if(m!=null){
            m.open();
            m.close();            
        }

    }
}
class Mouse{
    public void open(){}//开启功能
    public void close(){}
}
//-----------------------------------到此程序已经结束
//阶段3 后期的设备是不确定的，每多一个设备就加一个功能，耦合性太强我不需要每次都去面对具体的类型，只要定义一个规则，让后期的设备都符合这个规则，这样只要面对规则就可以了
//使用接口  重新设计  
1.先定义规则
interface Usb{
	//设备开启
	//设备关闭
	public void open();
	public void close();
}
class NoteBook{
	//运行
	public void run(){}
	//使用符合规则的设备
    public void useUsb(Usb usb){
        if(usb!=null){
            usb.open();
            usb.close();
        }
    	
    }
}
class Mouse implements Usb{
	public void open(){}
	public void close(){}
}
void main(){
	NoteBook book =new NoteBook();
	book.run();
	book.useUsb(null);
}




//测试功能
main(){
	    
}
```



多态中对成员的调用

1. 成员变量
   1. 当子父类中出现同名成员变量时，在多态调用时，只看调用改成员变量的引用所属的类
   2. 简单说：无论编译或者运行，都看=的左边就o了
2. 成员函数
   1. 函数具有覆盖特性，子父类中出现一样的函数时，多态调用编译时，看的是引用变量所属的方法，运行时看的是对象所属的类的方法   
   2. 简单说：编译看左边 运行看右边
   3. 成员方法动态绑定到当前对象上
3. 静态函数
   1. 静态方法跟对象没关系，只跟类有关系
   2. 编译运行看左边

```java
class Fu{
	int num=4;   
    void show(){
		sout("Fu show");        
    }
    static staticMethod(){
        
    }
}
class Zi extends Fu{
    int num=6
    void show(){
		sout("Zi show");
    }
    static staticMethod(){
        
    }
}
main(){
    //多态
    Fu f=new Zi();
    f.num  //4   Fu在调用  num为父的num
    f.show();
    f.staticMethod();
}

```



##6.Object

java语言中的上帝。所有类的父类，其中定义了所有对象都具备的功能。

native   修饰的方法没有方法体  本地方法  跟本地系统相结合的方法（linux c）

Object中的方法：

* equals(Object obj)    判断是使用==进行判断，如果判断两个对象是否相等（默认判断的是内存地址是否相同），需要覆盖
* toString()    返回该对象的字符串  打印对象时自动调用对象的toString方法

```java
class Person{
    private int age;
    public boolean equals(Object obj){//Object obj=new Person(); 编译看左边
        //如果比较的是同一个对象，直接比较地址
        if(this==obj)return true;

        //在转换的时候需要进行类型判断  如果传入了非Person类型的，直接返回false
        if(!(obj instanceof Person)){
            return false;
        }
        //obj.age是错误的，因为Object中没有age属性，想要使用子类对象特有的属性或行为，需要向下转型
        Person p=(Person) obj;
        //字符串的比较要使用String类的equals方法
        return this.name.equals(p.name) this.age==p.age;
    }
    public String toString(){
        return "Person[name="+this.name+",age="+this.age+"]";
    }
}
```



## 7.内部类

把类定义在另一个类的内部 （人对象，人对象中有一个心脏对象）

A类想访问B类中的成员时，可以将A类定义到B类中。作为B类的内部类存在

规则：

* 内部类可以直接访问外部类中的成员，外部类想要访问内部类，只能创建对象来访问
* 内部类相当于外部类中的一个成员，它就可以被成员修饰符所修饰 public private static

```java
class Outer{
    private int num=4;
    public void method(){//外部类想要访问内部类，只能创建对象来访问
        Inner in =new Inner();
        in.show();
    }
    
    class Inner{//内部类可以直接访问外部类中的成员
        void show(){//show的功能里面想使用num    
            sout(num);//省略了Outer.this   Outer.this.num
        }
    }
    static class Inner2{//静态内部类相当于外部类
        static void show3(){
            
        }        
    }
}

class InnerClassDemo{
    
    //内部类是非私有的，就可以在外部其他程序中被访问到 
	Outer.Inner in = new Outer().new Inner();//先有外部类对象再有内部类对象
    
    //静态非私有的内部类访问方式    Outer一进内存，Inner2就进了 因为是静态的
      Outer.Inner2 in= new Outer.Inner2();
    //静态非私有的内部类访问方式2 访问静态方法
    Outer.Inner2.show3()

    
    
}
```



内部类细节：

1. 为什么内部类可以访问外部类中的成员？

   因为内部类持有了外部类的引用 外部类名.this

2. 内部类不允许直接访问局部变量，因为 局部变量周期的生命周期比较短 

3. 匿名内部类：简化书写的内部类

   1. 格式 new 父类or接口名(){子类的内容} 
   2. 本质上是一个子类对象
   3. 应用场景： 接口里面只有一个两个方法时

   ```java
   //内部类
   class Outer{
       private int num=4;
       class Inner extends Demo{
           public void show(){
               sout(num);
           }
       }
       public void method(){
           new Inner().show();
       }
   }
   //匿名内部类  前提：内部类需要继承或者实现外部的类或者接口
   abstract class Demo{
       abstract void show();
   }
   class Outer{
       private int num=4;
       //匿名内部类
       public void method(){
           //格式
           new Demo(){
               //覆盖Demo中的抽象方法
               public void show(){
                   
               }
               
           }.show();//调用子类对象
           //多方法时，给对象起个名字
           Demo d=new Demo(){
               //覆盖Demo中的抽象方法
               public void show(){
                   
               }
           };
           d.show();
       }   
       
   }
   
   
   
   ```



练习

```java
class Ouer{
    public void method(){
        //编译通过
        new Object(){//创建匿名内部类
            public void show(){
                sout("show run")
            }
        }.show();
        //编译不通过
        Object obj=new Object(){//obj指向自己的子类对象 对象提升为Object,就不能调用子类的特有方法
            public void show(){
                sout("show run")
            }
        }
        obj.show();
        
    }
}
```



## 8.异常机制

异常：运行时发生的问题。

问题分两种：异常(Exception)和错误(Error)

Throwable对象是异常和错误的超类

* Error 虚拟机调用到了系统的底层，由系统底层发生的，然后转到jvm   不做针对性的处理，修改代码
* Exception jvm运行过程的发生的 可以针对性的处理



```java
int[] arr=new int[1];
arr[1];      
发生问题时，jvm就将这个已知的问题封装成对象 
new ArrayIndexOutOfBounceException(1);
把问题抛给main方法
throw new ArrayIndexOutOfBounceException(1);
main方法没有针对性的处理方式，main继续往外抛给jvm,jvm就使用了默认的处理方式，将问题的名称+信息+位置在控制台上显示出来。告诉调用者并结束程序
			
```

异常的处理

1. 遇到问题，不进行具体的处理，而是继续抛给调用者

   ```java
   class Demo{
       int div(int a,int b) throws Exception{//声明异常对象
           return a/b;     1. throw new ArithmeticException("/by zero");
       }
       
   }
   class ExceptionDemo2 {
       public static void main() throws Exception{
           Demo d=new Demo();
           int num=d.div(4,0); 2.throw new 
           
       }
   }
   ```

2. 捕获 try{}catch(){}finally{}

```java
try{
    //有可能发生异常的代码
}catch(异常类 变量){
    //这是真正的捕获，处理异常的代码都写在这
}finally{
    //一定会被执行的代码
}
//----------------------------------
Demo d=new Demo();
try{
    int num=d.div(4,0);
    
}catch(Exception e){
    //处理这个错误对象
    e.printStackTrace();   //名字+位置+信息   jvm默认调用这个方法，将这些信息显示在屏幕上 
    
}
```



throw  关键字  抛出对象

throw和throws有什么区别？

1. 位置不同  
   * throws用在函数上，后面跟的是异常类，可以跟多个
   * throw用在函数内，后面跟的是异常对象
2. 功能不同
   * throws 用来声明异常，让调用者知道该功能可能出现的问题，并由调用者可以给出预先的处理方式
   * throw 抛出具体的问题对象，执行到throw,功能就已经结束了，就跳转到了调用者



异常体系的特殊情况

* Error
* Exception

异常体系的最大特点是体系中的类以及类产生的对象，都具有可抛型，可以被throw或throws所操作



异常处理原则

1. 功能内部有异常throw抛出,功能上一定要有throws声明
   * 声明的目的就是为了让调用者处理(两种方式，try-catch)，如果调用者不处理，编译失败
2. 特殊情况：RuntimeException 和它的子类可以不声明
  * 不声明的目的就是不让调用者处理，让调用者的程序停止，对代码进行修改

Exception分两种

* 编译时会被检测的异常 throw new Exception()
* 运行时异常（编译时不检测） throw new RuntimeException()

```java
class Demo{
    int div(int a,int b)throws Exception{
        if(b=0){
            throw new Exception("除数为0");//功能内部有异常throw抛出,功能上一定要有throws声明
        }
    }
}
```



```java
getElement(int[] arr,int index){
    //增强程序的健壮性
    if(index<0 || index >= arr.length){
        throw new RuntimeException("数组下标不正确");
    }
}
```



自定义异常

定义一个功能可以实现除法运算，但是除数不能为负数

```java
class FuShuException extends RuntimeException{//自定义的类继承RuntimeException
    FuShuException(){
        super();
    }
    FuShuException(String message){
        super(message);
    }
}
class Demo{
    int div(int a,int b){
        if(b<0){
            throw new FuShuException("负数不可以作为除数");//自定义一个异常
        }
        if(b=0){
            throw new AritchmeticException("除数为0");
        }
    }
}
class DemoTest{
    main(){
        Demo d=new Demo();
        
    }
}
```



总结：

异常：就是将问题封装成对象，并抛给调用者

	如果声明了，就需要调用者处理（继续声明or捕获）
	
	什么时候声明，什么时候捕获？
	
	功能内部可以解决，就捕获，不能解决，或者解决了还必须告诉调用者这时应该声明

练习：毕老师用电脑讲课

```java
//错误类
class LanPingException extends Exception{
    LanPingException(){
        super();
    }
    LanPingException(String message){
        super(message);
    }
}
class MaoYanException extends Exception{
    MaoYanException(){
        super();
    }
    MaoYanException(String message){
        super(message);
    }
}

class Computer{
    private int state=0;
    public void run throws LanPingException,MapYanException(){
        if(state==1){//冒烟
         	throw new LanPingException("电脑蓝屏了");   
        }elseif(state==2){
            
        }
        System.out.println("run");
    }
}
class Teacher{
    private String name;
    private Computer comp;
    Teacher(String name){
        this.name=name;
        comp=new Computer();
    }
    public void prelect(){
        //可以针对不同的问题多catch处理
        try{
            comp.run();    
        }catch(LanPingException e){
            comp.reset();
            //继续讲课
            prelect();
        }catch(MaoYanException e){
            
        }
    }
}
class ExceptionTest{
    main(){
        
    }
}
```



---

中断—听不懂了

切换到包





---

## 9.包(package)

* 对类文件进行分类管理
* 给类提供多层命名空间
* 写在程序的第一行
* 类的全称是 包名.类名
* 包也是一种封装形式

```shell
set classpath=""  java设置类的路径

javac -d /java/javaapp  xxx.java          -d 指定编译后的class指定的地址
```



包中的类如果想被另外的包访问，要使用public关键字修饰类，修饰方法

protected权限 专门为子类提供的权限

包与包之间有两种权限可以使用：

* public

* protected 有限制

|          | public | protected | default | Private |
| -------- | ------ | --------- | ------- | ------- |
| 同一类中 | ok     | ok        | ok      | ok      |
| 同一包中 | ok     | ok        | ok      |         |
| 子类     | ok     | ok        |         |         |
| 不同包中 | Ok     |           |         |         |
|          |        |           |         |         |



##10 java多线程

####什么是线程？什么是进程？

持久化存储设备:  硬盘 寻道

临时性存储设备：内存 寻址

进程：不运行，只代表程序空间 应用程序在内存中分配的空间（正在运行中的程序）

线程： 进程中负责程序执行的执行单元。也称为执行路径 负责执行

	一个进程中至少有一个线程在负责该进程的运行
	
	如果一个进程中出现了多个线程，就称该程序为多线程程序

举例：

* 运动场就是一个进程，跑步的、跳远的、跳高的都是线程
* 360安全卫士 杀毒 体检 清理垃圾

多线程技术解决什么问题？

多部分代码同时执行，提高用户体验

cpu同一时间只能处理一条线程，所以不会提高性能        可以合理使用cpu资源



####jvm中的多线程

至少有两个线程，一个是负责自定义代码运行的，一个是负责垃圾回收的

多线程的运行是根据cpu的切换完成的，怎么切换cpu说了算所以多线程有一个随机性

```java
class Demo{
    
}
class FinalizeDemo{
    void main{
        //因为是匿名对象，所以需要清理垃圾   创建对象是一个线程 垃圾回收是一条线程
        new Demo();
        new Demo();
        new Demo();        
        new Demo();
        new Demo();
        new Demo();
    }
}

```



收垃圾

方法 finalize

每个线程都有运行的代码内容，称为线程的任务。

线程的任务封装在特定的区域中

比如：主线程运行的任务都定义在main方法中，垃圾回收线程在收垃圾时都会运行finalize方法

```java
class Demo{
    //定义垃圾回收方法
    public void finalize(){
     	   System.out.println("demo ok");
    }
}
class FinalizeDemo{
    void main{//main方法执行的线程，成为主线程
        new Demo();
        new Demo();
        new Demo();        
        System.gc();//启动垃圾回收器  启动不一定执行   

    }
}


```



#### 单线程的问题

```java
class Demo{
    String name;
    Demo(String name){
        this.name=name;
    }
    public void show(){
        for(int x;x<=10;x++){
            sout(this.name+"..."+x);
        }
    }
}
class ThreadDemo{
    void main(){
        Demo d1=new Demo("zhengsan");
        Demo d2=new Demo("lisi");
        d1.show();//先执行d1.show()执行完成之后才能执行d2.show()
        d2.show();
    }
    
}
```

####如何新建一个线程？

方法一：将类声明为thread(java.lang.Thread)的子类 

* 继承thread类
* 覆盖run方法
* 调用start方法  1.开启线程 2.调用run方法

```java
class Demo extends Thread{//继承Thread类
    private String name;
    Demo(String name){
        this.name=name;
    }
    public void show(){
        for(int x;x<=10;x++){
            sout(this.name+"..."+x);
        }
    }
    //覆盖run方法 线程一启动就会调用run
    //自定义线程的任务代码都存在run方法中
    //主线程的任务在main方法中
    public void run(){
        this.show();
    }
}
class ThreadDemo{
    void main(){
        //创建子类对象就是创建线程
        Demo d1=new Demo("zhengsan");
        Demo d2=new Demo("lisi");
        //线程运行 调用start()方法 
        d1.start();
        d2.start();
    }
    
}
```



线程的一些方法

* 如果获取线程的名字？   getName()    
* 获取当前的线程对象 Thread.currentThread() 

调用start和调用run的区别?

调用start会开启线程,让开启的线程去执行run方法,调用run方法不会开启线程，只是执行run方法



####多线程的运行状态

* 被创建 

* 运行  具备了cpu的执行资格，具备了cpu的执行权

* 消亡  run()结束进入

* 冻结 sleep(time) wait()（需要唤醒notify()不唤醒程序会挂起）  线程调动sleep或者wait进入冻结   释放了cpu的执行权，同时释放了cpu的执行资格

* 临时阻塞状态 具备cpu的执行资格，不具备cpu的执行权（开始执行）

#### 多线程实例-售票

```java
//多个窗口卖票 
class saleTicket extends Thread{
    private int tickets=100;
    
    public void run(){
        while(true){
            if(this.tickets!=0){
                this.tickets--;  
                sout(Thread.currentThread+this.getName()+this.tickets--);
            }

        }

    }
}
class TicketDemo{
    //创建4个线程
    saleTicket t1=new saleTicket();
    saleTicket t2=new saleTicket();
    saleTicket t3=new saleTicket();
    saleTicket t4=new saleTicket();
}
```

问题：tickets每个对象中都有一个，会创建400张票 不建议票变成静态的，如果共享100张票呢？

答案：不能让线程单独持有资源 将资源和线程分离

#### 创建线程的方式二：实现Runnable接口

1. 定义一个类，实现Runnable接口
2. 覆盖Rubbable接口中的run方法
3. 通过Thread类创建线程对象，并将实现了Runnable接口的对象作为参数传入
4. 调用start()方法

```java
class saleTicket implements Runnable{
    private int tickets=100;
    public void run(){
        while(true){
            if(this.tickets>=0){
                
                sout(Thread.currentThread.getName()+this.tickets--);
            }

        }
    }
}
class saleTicketDemo2{
    //线程任务对象
    SaleTicket t=new SaleTicket();
    //
    Thread t1=new Thread(t);
    Thread t2=new Thread(t);
    Thread t3=new Thread(t);
    t1.start();
    t2.start();
    t3.start();

}
```



符合Runnable接口的，线程都能运行   

实现Runnable接口的好处：

* 避免了继承Thread类的单继承的局限性
* Runnable接口更符合面向对象，将线程单独进行对象的封装
* 降低了线程对象和线程任务的耦合性



#### 多线程的安全问题

多线程具有随机性，所以线程存在安全问题



安全问题产生的原因

1. 线程任务中有处理到共享的数据（共享tickets）
2. 线程任务中有多条对共享数据的操作（分开执行） 一个线程在操作共享数据的过程中，其他线程参与了运算，造成了数据的错误

解决的思想:

只要保证多条操作共享数据的代码在某一时间段，被一条线程执行，在执行期间不允许被其他线程参与运算

使用 同步代码块解决

```java
synchronized(对象){//锁 火车上的卫生间
    
	//需要被同步的代码
        if(this.tickets>=0){
        this.tickets--;  
        Thread.sleep(10);
        sout(Thread.currentThread.getName()+this.tickets--);
    }
}

```

#### 同步代码块(锁)

好处：解决了多线程的安全问题

弊端：浪费资源

同步的前提：

* 多个线程在同步中必须使用<b>同一个锁</b>，这才是对多个线程同步

小练习

```java
//两个储户，到同一个银行存钱，每个人存了3次，一次100
//描述银行
//描述储户任务
class band{ 
	private int sum;
    public void add(int n){ //synchronized也可以修饰函数
        synchronized(obj){
              sum=sum+n;
            try{Thread.sleep(10;)}catch(Exception e){}
            sout("sum="+sum);  
        }
    	
    }
    //同步函数 同上 同步函数的锁是this
    public synchronized void  add(int n){
		 sum=sum+n;
        try{Thread.sleep(10;)}catch(Exception e){}
        sout("sum="+sum);  
    }
}
class Customer implements Runnable{
	private Band b=new Band();
	
    public void run(){
        for(int x=0;x<3;x++){
			b.add(100);
        }
    }
}
class ThreadTest{
    main{
        Customer c=new Customer;
        Thread t1=new Thread(c);
        Thread t2=new Thread(c);
        t1.start();
        t2.start();
    }
}
//分析多线程是否存在安全隐患
//1.线程任务中是否有共享的数据  sum
//2.是否有多条操作共享数据的代码 sum=sum+n;sout();
```



同步函数的锁是this

如何验证？

静态函数的锁是类名

如何验证？





https://www.baidu.com/s?wd=love









