## MongoDB安装
* 苹果终端直接执行
      brew install mongodb
* centos 后期看文档安装

* 基本概念
  - mongod是用来连接到mongodb数据库服务器的，即服务器端
  - mongo是用来启动MongoDB shell的，是mongodb的命令行客户端
  - 修改环境变量
    - 把mongodb/bin加入$PATH,以免我们每次输入sudo monogd,
          touch .base_profile
          vim .base_profile
    - 加入path
          export MONGO_PATH=/usr/local/mongodb
          export PATH=$PATH:$MONGO_PATH/bin
  - 启动mongodb服务器
          mongod --config /usr/local/etc/mongod.conf
  - mongod.conf文件中bindIp: 127.0.0.1意思是本机访问，如果是外网访问需要重新设置
  - 如果要修改数据库路径的话，终端输入 mongod --dbpath 路径
