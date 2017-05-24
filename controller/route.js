
//控制器  向app.js暴露方法  调用files方法

//引入file.js  将方法暴露的同时也需要引入该文件
var file = require('../model/file.js');

//处理上传数据依赖文件
var formidable = require("formidable");   //处理post上传数据
var sd = require("silly-datetime");       //时间处理API
var path = require("path");
var fs = require("fs");


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

//处理上传数据 获取表单提交数据 formidable
exports.doupload=function(req,res){

    // 新建 incomingform
    var form = new formidable.IncomingForm();

    //设置文件上传的放置位置 temp临时文件夹 
    //path.normalize --> 规范化给定的path并解析'..'和'.'片段。
    //__dirname --> 当前模块的目录名
    //trmp路径:C:\Users\Administrator\Desktop\upload_pic\upload_PIC\temp

    form.uploadDir = path.normalize(__dirname+"/../temp");

    //formidabel 上传数据被分为表单域，文件
    form.parse(req,function(err,fields,files){
        
        if(err){       
            throw err;
        }

        // console.log(files);
        //将上传文件重命名 时间戳+随机数+后缀名
        var time = sd.format(new Date(),"YYYYMMDDHHmmss");
        var rand = parseInt(Math.random()*1000);
        var extname = path.extname(files.uploadPic.name); 
        
        // 获取地址  fs.rename(oldPath, newPath, callback);
        var oldPath = files.uploadPic.path; //temp 临时文件夹内地址
        var newPath = path.normalize(__dirname+"/../upload/"+fields.folderName+"/"+time+rand+extname);

        fs.rename(oldPath, newPath, function(err){

            if(err){
                throw err;
            }

            console.log("图片上传成功");

            // 上传成功后页面跳转到主页面
            file.getAllFolder(function(allFolderName){
                res.render("index", {"folder":allFolderName});
            });
        });
    })
    return;
}


// 处理图片上传页面
exports.upload=function(req,res){
    //获取文件目录
    file.getAllFolder(function(allFolderName){
        res.render("upload",{"folder":allFolderName});
    });
}

//暴露显示小图标方法
exports.ico=function(req,res){
    return;
}

//处理无效请求
exports.error = function(req,res){
    res.render("error");
}