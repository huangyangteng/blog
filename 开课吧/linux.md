# linux-centos

—联网

配置文件都在/etc下面

net-tools (软件包ifconfig) 

```shell
#联网改配置 
vim /etc/sysconfig/network-scripts/ifcfg-eth0

#重启服务     
/etc/init.d network restart

#更新软件
yum update -y  参数y一路确定 更新软件和内核
yum upgrade   只更新软件
```



---

---更新Yum下载源

使用网易的yum源更新   mirrors.163.com

---连接ssh

putty



—防火墙

```shell
iptables  
iptables -F #删除所有配置
```



—端口转发

```nginx
location /node{ #只要访问node目录，就是访问localhost:8080
    proxy_pass http://localhost:8080/;
    proxy_set_header host $host;   #转化的时候修改头为真实的头
}
```

Setsebool -P httpd_can_network_connect 1   //修改配置

--反向代理

```nginx
location /node{ #只要访问node目录，就是访问localhost:8080
    proxy_pass https://www.baidu.com/;  
}
```

