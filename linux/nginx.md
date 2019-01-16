#nginx

### 一、应用场景

* 静态资源服务
* 反向代理服务
  * nginx的强大性能
  * 缓存 
  * 负载均衡
* api服务
  * OpenResty

###nginx的主要优点

* 高并发、高性能
* 可扩展性好
* 高可靠性  运行数年 运行在企业内网的边缘节点
* 热部署
* BSD许可证

### nginx的组成

* nginx二进制可执行文件
* nginx.conf 配置文件
* access.log访问日志
* error.log错误日志

### nginx的版本发布和版本选择

* 开源版 nginx.org
* 商业版 nginx.com

### 编译nginx的过程

下载nginx.org->个目录->configure->编译->安装

```shell
//解压文件
tar -xzf nginx-1.14.0.tar.gz
ll
-rw-r--r--@  1 best9  staff   282K 12  4 22:52 CHANGES
-rw-r--r--@  1 best9  staff   430K 12  4 22:52 CHANGES.ru
-rw-r--r--@  1 best9  staff   1.4K 12  4 22:52 LICENSE
-rw-r--r--@  1 best9  staff    49B 12  4 22:52 README
drwxr-xr-x@ 25 best9  staff   850B 12  4 22:52 auto
drwxr-xr-x@ 11 best9  staff   374B 12  4 22:52 conf
-rwxr-xr-x@  1 best9  staff   2.4K 12  4 22:52 configure
drwxr-xr-x@  6 best9  staff   204B 12  4 22:52 contrib
drwxr-xr-x@  4 best9  staff   136B 12  4 22:52 html
drwxr-xr-x@  3 best9  staff   102B 12  4 22:52 man
drwxr-xr-x@  9 best9  staff   306B 12  4 22:52 src
//把contrib下面的vim文件拷贝到.vim中
cp -r contrib/vim/* ~/.vim/
//查看配置帮助
./configure --help 
//编译 配置安装路径
./configure --prefix=/usr/local/nginx
//make编译
make
```



### 配置语法

* 配置文件由指令与指令块构成
* 每条指令以;分号结尾，指令与参数间以空格符号分隔
* 指令块以{}大括号将多条指令组织在一起
* include语句允许组合多个配置文件以提升可维护性 
* 使用#符号添加注释，提高可读性
* 使用$符号使用变量 
* 部分指令的参数支持正则表达式

```nginx
http{
    include   mime.types;
    upstream thwp{
        server 127.0.0.1:8080;
    }
    server {
        listen 443 http2;
        #nginx注释
        limit_req_zone $binary_remote_addr zone=one:10m rate=1r/s;
        location ~* \.(gif|jpg|jpge)$ {
            proxy_cache my_cache;
            expires 3m;proxy_cache_key $host$uri$is_args$arg;
            proxy_cache_valid 200 304 302 ld;
            proxy_pass http://thwp;
        }
    }
}
```

配置参数：时间的单位

* ms  milliseconds
* s seconds
* m minutes
* h hours
* d day
* w weeks
* M months
* y years

配置参数：空间的单位 1byte=8bit 1KB=1000B

* default bytes
* k kilobytes
* m megabytes
* g gigabytes

http配置的指令块

* http 
* server
* location
* upstream

### nginx命令行

```nginx
#格式
nginx -s reload
#帮助
-? || -h
#使用指定的配置文件 nginx -c xx.conf
-c
#指定配置指令  
-g
#指定运行目录
-p
#-----------------------------------------
    #发送信号  操作运行中的进程
    -s
    #立即停止服务 -s stop
    stop
    #优雅地停止服务 -s quit
    quit
    #重载配置文件 -s reload
    reload
    #重新开始记录日志文件 -s reopen
    reopen

#---------------------------------------
#测试配置文件是否有语法错误
-t -T
#打印nginx的版本信息，编译信息
-v -V


```

#### 演示

```nginx
#重载配置文件
./nginx -s reload
ps -ef | grep nginxcd
#日志切割 使用bash脚本   没听懂
#热部署 没听懂   
```

### 配置静态资源服务器

```nginx
#命名日志格式
    log_format main ''
server{
    
    access_log logs/geek.log main;#日志文件所在地
    
    listen:8080;
    location /{#所有的请求/
        alias dlib/;   # 访问/  相当于访问dlib/
        autoindex on;#共享静态资源  显示目录
        set $limit_rate 1k;# 限制nginx向浏览器发送相应的速度 每秒1k
        index index.html index.htm;
    }
    gzip on;
    gzip_min_length 1;  #小于1字节，不压缩
    gzip_comp_level 2;  #压缩级别
    gzip_types text/plain image/png;#指定类型进行gzip压缩
}
```





###配置具有缓存功能的反向代理服务器

把请求代理给上流服务器

* 上游服务 添加更多的上游服务器来处理请求

```nginx
#上游服务用于处理业务逻辑，对外界不提供访问
server{//改一下配置
    listen 127.0.0.1:8080;
}
```

搭建反向代理

```nginx
upstream local{#这一批服务器
    server 127.0.0.1:8080;
}
```

### goAccess数据可视化 分析网站运营情况



### 域名安装ssl证书

```shell
#下载certbox
yum install python2-certbot-nginx
# 配置
certbot --nginx --nginx-server-root=nginx.conf所在目录 -d 域名
```





