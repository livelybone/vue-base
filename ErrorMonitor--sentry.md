# 前端错误监控

## 私有化sentry服务部署（通过docker安装）

#### 一、安装依赖

1. ##### docker 安装

   检查预备条件

   ```shell
   # 1.内核（linux3.8以上）
   $ uname -a
   # 2.存储驱动（Deviece Manager）
   $ ls -l /sys/class/misc/device-mapper
   ```

   docker 安装

   ```shell
   # 1.安装基本软件
   $ apt-get update
   $ apt-get install apt-transport-https ca-certificates curl software-properties-common  lrzsz -y
   # 2.更换源（这里使用阿里云的源）
   $ curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -
   $ add-apt-repository "deb [arch=amd64] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable"
   $ apt-get update
   # 3.安装docker
   $ apt-get install docker-ce -y
   # 4.测试docker是否安装成功
   $ docker version
   $ ifconfig
   ```

   docker加速器配置

   ```shell
   # 1.在https://www.daocloud.io/注册并登录。在登录后的页面,点击“加速器”标签获取命令并执行
   $ curl -sSL https://get.daocloud.io/daotools/set_mirror.sh | sh -s http://e5d212cc.m.daocloud.io
   # 2.修改daemon.json文件
   $ vim /etc/docker/daemon.json
   # docker cloud加速器的默认内容是少了一条配置，所以我们要编辑文件在后面加上"insecure-registries": []，如下
   {"registry-mirrors": ["http://e5d212cc.m.daocloud.io"], "insecure-registries": []}
   # 3.重启docker
   $ systemctl restart docker
   ```

   docker权限问题

   ```shell
   # 1.如果还没有docker group就添加一个
   $ sudo groupadd docker
   # 2.将用户加入该 group 内，然后退出并重新登录
   $ sudo gpasswd -a ${USER} docker
   # 3.重启docker服务
   $ systemctl restart docker
   # 4.切换当前会话到新会话，或重启X会话
   $ newgrp - docker
   # 注意:最后一步是必须的，否则因为groups命令获取到的是缓存的组信息，刚添加的组信息未能生效
   ```

2. ##### docker-compose安装

   ```shell
   # 安装依赖
   $ sudo apt-get install python-pip -y
   # 安装docker-compose
   $ sudo pip install docker-compose
   # 查看docker-compose版本
   $ sudo docker-compose version
   
   # pip源问题
   # 用pip安装依赖包时默认访问https://pypi.python.org/simple/，经常出现不稳定以及访问速度非常慢的情况，推荐替换成阿里云的镜像
   # 在当前用户目录下创建.pip文件夹
   $ mkdir ~/.pip
   # 然后在该目录下创建pip.conf文件填写：
   [global]
   trusted-host=mirrors.aliyun.com
   index-url=http://mirrors.aliyun.com/pypi/simple/
   ```

#### 二、用docker安装sentry

```shell
# 1.克隆文件
$ git clone https://github.com/getsentry/onpremise.git
# 2.进入onpremise目录，创建需要用到的数据卷
$ docker volume create --name=sentry-data && docker volume create --name=sentry-postgres
# 3.生成环境文件
$ cp -n .env.example .env
# 4.创建服务
$ docker-compose build
# 5.生成密钥
$ docker-compose run --rm web config generate-secret-key
# 6.将密钥添加为环境变量
$ vim .env
  SENTRY_SECRET_KEY=''   #将生成的密钥写入引号内
# 7.创建管理员账户
$ docker-compose run --rm web upgrade
# 8.启动服务
$ docker-compose up -d
```

#### 三、邮件配置

1. ##### 修改配置文件

   ```shell
   $ vim config.yml
   ```

   ```yaml
   ###############
   # Mail Server #
   ###############
   mail.backend: 'smtp'  # Use dummy if you want to disable email entirely
   mail.host: 'smtp.qq.com'
   mail.port: 587
   mail.username: '574034200@qq.com'
   mail.password: '***********'  #不是邮箱密码，是smtp授权码
   mail.use-tls: true
   # The email address to send on behalf of
   mail.from: '574034200@qq.com'
   ```

2. ##### 设置环境变量

   ```shell
   $ vim .env
   ```

   ```shell
   SENTRY_SERVER_EMAIL=574034200@qq.com
   SENTRY_EMAIL_HOST=smtp.qq.com
   SENTRY_EMAIL_USER=574034200@qq.com
   SENTRY_EMAIL_PASSWORD=***********
   SENTRY_EMAIL_PORT=587
   SENTRY_EMAIL_USE_TLS=true
   ```

3. ##### 修改docker-compose.yml文件

   ```shell
   $ vim docker-compose.yml
   ```

   ```yaml
   version: '3.4'
   
   x-defaults: &defaults
     restart: unless-stopped
     build: .
     depends_on:
       - redis
       - postgres
       - memcached
       - smtp
     env_file: .env
     environment:
       SENTRY_MEMCACHED_HOST: memcached
       SENTRY_REDIS_HOST: redis
       SENTRY_POSTGRES_HOST: postgres
       #SENTRY_EMAIL_HOST: smtp    # 此行注释掉
     volumes:
       - sentry-data:/var/lib/sentry/files
   ```

4. ##### 更新服务

   ```shell
   $ docker-compose build
   $ docker-compose run --rm web upgrade
   $ docker-compose up -d
   ```

#### 四、测试

1. ##### 设置根域名

   ​	访问 http://localhost:9000/，用创建的管理员账号登陆后跳转至设置根域名界面，设置为http://xxxxx.com或者http://x.x.x.x:9000。注意：根域名末尾不要加 / ，否则生成的DSN无法使用。

   ​	根域名可通过sentry config命令修改，例如：

   ```shell
   # 进入容器
   $ docker exec -it <容器id> /bin/bash
   # 修改根域名
   $ sentry config set system.url-prefix http://xxxx.com
   # 退出容器
   $ exit
   ```

2. ##### 新建项目，生成DSN

   ​	点界面右上角Add new Project，选择所使用的编程语言，例如选择go，新建项目后会出现使用教程，DSN可在项目的设置中查看。DSN格式为http://<public-key>@<root-url>/<project-id>，用于客户端与服务端间的通信。

3. ##### 测试报错预警

   获取go sdk

   ```shell
   $ go get github.com/getsentry/raven-go
   ```

   代码示例

   ```go
   package main
   
   import "github.com/getsentry/raven-go"
   
   func main() {
       _, err := time.ParseDuration("10")
   	if err != nil {
   		logrus.Errorln(err)
   		raven.CaptureErrorAndWait(err, nil)
   		return
   	}
   }
   
   func init() {
   	raven.SetDSN("http://428b55fd480149f0b1793df7a0197c76@sentry.io/1398985")
   }
   ```

   运行代码后收到邮件提示，登陆sentry网页发现项目内已经有一个报错事件了。



ps: 不同的编程语言需要安装各自的sdk，具体的使用看官方文档 https://docs.sentry.io/ 或者github https://github.com/getsentry/sentry

#### 五、钉钉推送

1. ##### 修改requirements.txt

   ```shell
   $ cd onpremise
   $ vim requirements.txt # 增加下面模块和版本号
   redis-py-cluster==1.3.4
   ```

2. ##### 修改Dockerfile

   ```shell
   $ vim Dockerfile
   # 添加 RUN pip install git+https://github.com/L3T/sentry-dingding.git
    
   FROM sentry:9.0-onbuild
   RUN pip install git+https://github.com/L3T/sentry-dingding.git
   ```

3. ##### 重启服务

   ```shell
   $ docker-compose build
   $ docker-compose run --rm web upgrade
   $ docker-compose up -d
   ```

4. ##### 添加机器人

   1. 进入项目集成，启用钉钉模块

      ![1551096033168](C:\Users\Sun Zhenyu\AppData\Roaming\Typora\typora-user-images\1551096033168.png)

      ![1551096110658](C:\Users\Sun Zhenyu\AppData\Roaming\Typora\typora-user-images\1551096110658.png)

   2. 配置机器人webhook

      ![1551096225220](C:\Users\Sun Zhenyu\AppData\Roaming\Typora\typora-user-images\1551096225220.png)

      ![1551096310008](C:\Users\Sun Zhenyu\AppData\Roaming\Typora\typora-user-images\1551096310008.png)
