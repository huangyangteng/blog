# mysql基本操作

##1. 登录 

mysql -u root -p  回车输入密码

退出登录

exit

## 2. 切换数据库

```MYSQL
显示所有的数据库
SHOW DATABASES;
切换到数据库
USE XXX;

```

## 3. 表的相关操作

```mysql
显示所有的表
SHOW TABLES;

显示表中所有的列
SHOW COLUMNS FROM user;
或者  describe user;  DESCRIBE user;

```

## 4. 检索数据

