# 环境安装
### 安装

`npm install`  `npm install gulp -g`  

### 前端目录
  - public/css 存放开发环境的css的代码,没个css文件需要尽量和对应的html相同(开发的时候好找);
  - public/js/configs 存放angular配置信息,比如$http.js 截取所有的http请求,加上header信息。;
  - public/js/controllers 存放所有的页面对应的controller 尽量文件名+Controller(好找) ;
  - public/js/directive 存放项目的指令;
  - public/js/filter 存放项目的过滤器;
  - public/js/services 存放项目的service和factory 
  - public/js/app 存放项目的路由信息(ui-router) 。
  - public/lib 存放项目所使用的外部插件,包括css和js 。
  - public/min 这个文件存放压缩后的js和css文件。(gulp命令自动执行,不需关心)
  - public/templates 存放页面模版(经过压缩的)
  - public/tplsrc 存放页面模版(没有压缩过的)
### 前端部署
--前端部署
  1 线上环境 NODE_ENV=prod pm2 start bin/www.js --name 'ims-prod';
  2 测试环境 NODE_ENV=dev pm2 start bin/www.js --name 'ims-dev';
  2 本地启动 gulp;

### 代码规范

这里使用`JSCS` `ESLINT`来约束代码规范.

- 参考[JSCS](http://jscs.info/)
- 参考[ESLINT](http://eslint.org/)

#### 通过 NODE 执行规范检查

`npm run lint`.

#### 通过 IDE 执行规范检查

WebStorm/IDEA 需要安装 JSCS/ESLINT 检查工具并设置 JSCS/ESLINT module 的位置 

[jscs](https://plugins.jetbrains.com/plugin/7554)

[eslint](https://plugins.jetbrains.com/plugin/7494)

Sublime Text 需要安装 以下工具

[SublimeLinter-jscs](https://packagecontrol.io/packages/SublimeLinter-jscs)

[SublimeLinter-eslint](https://packagecontrol.io/packages/SublimeLinter-contrib-eslint)

### 参考 NODE HTTP PROXY 的实现

- [node-http-proxy](https://github.com/nodejitsu/node-http-proxy)
