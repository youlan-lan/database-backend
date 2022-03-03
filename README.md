# 模拟志愿录取-后台

## 开发介绍
首先先在轻服务官网上注册账号，等待拉入项目组。拉下来该仓库后，先使用 `i login` 命令，在本地登录轻服务账号，然后使用 `i dev` 命令，可以进入开发者的模式，在本地运行项目。

写完api后，应切换并合并到test分支下，拉取main仓库的dev分支，合并后重新测试接口，若无异常应提交到自己的远程仓库，对团队主仓库发起PR，等待合并后会部署到轻服务的远程服务器上。若比较着急，可以自己在本地使用 `i deploy` 直接部署，获取api的公网url地址。

## 代码结构
代码主要在src目录下，其中models目录主要存放数据库处理相关操作，每一个js文件都代表一个表或一个视图，或一个相关的数据库多表联查的功能（建议多表联查采用视图）。目录下的test文件是对数据库查询等的测试。

services目录是服务层，主要处理业务逻辑，由Controller层或者Services层的其他代码调用。

Controller层是业务请求的入口，会获取到请求的相关信息，对其进行解析后调用相关Services层的类来处理业务。

routers层是拼接业务路由，在此进行url请求的组装。

最后在app.js中注册路由

## 1.4记录 -xcy_dev
- 添加了学生信息视图表的查询支持

## 1.3记录-xcy_dev
- 添加了信息表的查询支持，对学院查询，对专业查询

## 1.2记录-xcy_dev
- 修改了目录结构，将jwt 数据库连接的文件转移到utils目录下
- 添加了日志系统，具体使用方法参照utils/LogHelper目录下的test文件
- 添加了插入/读取/更改config的api
- 添加了jwt头部验证

## 12.31记录-master
- 初始化仓库
- 添加了用户注册的逻辑和api

# 轻服务云工程 Express 项目

此项目运行在[轻服务云工程](https://qingfuwu.cn/docs/cloud-project/quickstart.html)中。

轻服务云工程提供开箱即用的开发体验，开发者无需考虑服务器和数据库等基础设施的搭建，更不用操心测试环境配置、数据备份和线上运维等一系列繁琐之事，只需专注于产品开发本身。

## 安装轻服务 CLI

```sh
npm i -g @byteinspire/cli
```

更多 CLI 的使用方法，可参考：[安装和使用 CLI](https://qingfuwu.cn/docs/cloud-project/cli.html)。

## 本地开发项目

```sh
inspirecloud dev
```

更多本地开发细节，可参考：[本地调试云工程](https://qingfuwu.cn/docs/cloud-project/dev.html)。

## 部署项目至云端

```sh
inspirecloud deploy
```

或

```sh
inspirecloud deploy -m "Deploying a new feature."
```

更多部署项目的细节，可参考：[部署云工程](https://qingfuwu.cn/docs/cloud-project/deploy.html)。

## 项目目录

```sh
project
  |- node_modules    # 该项目的依赖项的安装目录
  |- public          # 静态资源目录
  |- src             # 包含主要逻辑文件的目录，为 Express 的工程文件
      |- controllers   # controller 是业务入口
      |- models        # model 负责数据操作
      |- routes        # route 是路由定义
      |- services      # service 是业务定义
      |- app.js        # app 是 Express 实例定义
  |- index.js        # 云工程的入口文件
  |- inspirecloud.json  # 轻服务云工程配置文件
  |- package.json    # npm 的通用配置文件
  |- .gitignore      # Git 管理时标识忽略内容的文件
```

## 反馈

有任何问题和建议，欢迎使用飞书扫描下方二维码，加入官方支持群反馈。

![lark-group](https://lf3-static.bytednsdoc.com/obj/eden-cn/fuvazli/lark-group-blank.jpeg)

---
Powered By [轻服务 - 面向未来的云服务](https://qingfuwu.cn)
