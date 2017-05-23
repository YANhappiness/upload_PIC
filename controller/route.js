
//控制器  向app.js暴露方法  调用files方法

//引入file.js
var file = require('./model/file.js');

//暴露显示主页方法
exports.showIndex=function(req,res){

    res.render("index");
}



//暴露显示小图标方法
exports.ico=function(req,res){
    return;
}