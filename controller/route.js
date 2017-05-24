
//控制器  向app.js暴露方法  调用files方法

//引入file.js
var file = require('../model/file.js');

//暴露显示主页方法
exports.showIndex=function(req,res){

    //res.render("index",{"folder":file.getAllFolder(allFolderName)});

    //解决异步问题 回调函数
    // fil.getAllFolderName(callback)  function(allFolderName){});
    file.getAllFolder(function(allFolderName){
        res.render("index",{"folder":allFolderName});
    });
};

//暴露显示文件夹内图片 1.获取文件夹名称 2.传回该文件夹图片数组
exports.showPic = function(req,res,next){
    //获取文件名
    var folderName = req.params.folderName;

    file.getAllPic(folderName,function(err,picArray){
        //处理文件夹内文件找不到，找不到next()，交给下一个中间件
        if(err){
            next();
            return;
        }
        //返回文件名和图片路径
        res.render("photoFile",{"folderName":folderName,"picPath":picArray});
    })

}


//暴露显示小图标方法
exports.ico=function(req,res){
    return;
}