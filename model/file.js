//对文件进行读取操作并将方法暴露到route.js上

var fs = require('fs');

//获取所有文件夹目录
exports.getAllFolder = function(callback){
    //return ['喜羊羊','美羊羊','灰太狼'];

    //读取/upload所有目录 fs.readdir -->读取文件夹目录
    fs.readdir("./upload",function(err,folder){
        if(err){
            throw err;
        };

        //设置空数组接收所有文件目录
        var allFolderName = [];

        //    (function iterator(i){...})(0)  立即执行函数  0作为i的初始值  解决文件读取的异步问题
        (function iterator(i){

            //遍历文件夹下的文件  fs.stat-->可根据返回值stats判断文件类型
            fs.stat("./upload/"+folder[i],function(err,stats){
                //判断是否遍历结束
                if(i == folder.length){
                    //将文件数组返回
                    return callback(allFolderName);
                }
                //如果没有找到该文件
                if(err){
                    //callback("没有找到该文件",null);
                    //return;
                    throw err;
                }

                //判断文件类型是否为文件夹
                if(stats.isDirectory()){
                    allFolderName.push(folder[i]);
                }
                iterator(i+1);
            })
        })(0)




    });


};
