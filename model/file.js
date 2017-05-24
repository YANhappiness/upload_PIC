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
                    callback(allFolderName);
                    return;
                };

                //如果没有找到该文件   ?????
/*                if(err){
                    callback("没有找到该文件",null);
                    //return;
                    throw err;
                };*/

                //判断文件类型是否为文件夹
                if(stats.isDirectory()){
                    allFolderName.push(folder[i]);
                };
                iterator(i+1);
            });
        })(0)
    });
};

//获取所有文件夹内图片
exports.getAllPic=function(folderName,callback){
                    
    //读取upload文件夹目录
    fs.readdir("./upload/"+folderName,function(err,data){
        
        //新建空文件数组用于存放文件
        var picArray = [];

        if(err){
            callback("没有找到该文件",null);
            return;
        }
        (function iterator(i){

            //遍历文件夹下文件，判断该对象是否为文件
            fs.stat("./upload/"+folderName+"/"+data[i],function(err,stats){
                //判断是否遍历完成
                if(i == data.length){
                    callback(null,picArray);
                    return;
                }

                //如果找不到该文件夹下的对象则抛出    
                if(err){
                    callback("找不到文件",null);
                    return;
                }
                //判断是否为文件
                if(stats.isFile()){
                    picArray.push(data[i]);
                }
                iterator(i+1);
            });
        })(0);
       
    })
};
