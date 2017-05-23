
//项目主入口
var express = require('express');  //引入express框架
var app = express();
var ejs = require('ejs');   //引入ejs模版引擎
var route = require('./controller');   //引入控制层路由

//设置模版类型
app.set("view engine","ejs");

//读取本地静态文件
app.use(express.static('./public'));
app.use(express.static('./upload'));

//设置路由跳转
app.get("/favicon.ico",route.ico);   //处理小图标请求
app.get("/",route.showIndex);        //处理首页请求

//设置监听端口
app.listen(80);
