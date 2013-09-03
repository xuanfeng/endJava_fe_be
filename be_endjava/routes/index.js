
/*
 * GET home page.
 */

var fs = require('fs'),
    path = require("path"),
    jsonFolderPath = "./public/jsons/";

//返回首页
exports.getIndexPage = function(req, res){
    res.render('jsonEditer.jsp', {
		layout: false
	});
};

//新建json文件
exports.createJsonFile = function(req, res){
    var fileName = req.query.fileName.toLowerCase(),
        re = /\.json$/,
        resData = {};
    fileName += (re.test(fileName) ? "" : ".json");
    //判断json文件是否已经存在，存在则返回错误信息，不存在则新建文件，并返回成功信息
    var jsonFilePath = jsonFolderPath + fileName;
    fs.exists(jsonFilePath, function (exists) {
        if(exists){
            resData.exist = true;
            resData.success = false;
            resData.fileName = fileName;
            res.send(resData);
        }else{
            fs.open(jsonFilePath, "a", function(e, fd){
                fs.writeFile(jsonFilePath, "{}", function(err){
                    resData.success = (err == null ? true : false);
                    resData.exist = false;
                    resData.fileName = fileName;
                    res.send(resData);
                });
            });
        }
    });
};

//返回所有json文件名
exports.getJsonFileList = function(req, res){
    fs.readdir(jsonFolderPath, function(err, files){
        if(err){
            console.log(err);
        }
        res.send(files);
    });
};


//返回指定json文件的内容
exports.getJsonFile = function(req, res){
    var jsonName = req.query.fileName;
    fs.readFile(jsonFolderPath + jsonName, function(err, fileData){
        if(err){
            console.log(err);
            res.send(["没找到", jsonName].join(""));
        }else{
            res.send(fileData);
        }
    });
};

//保存指定json文件的内容
exports.saveJsonFile = function(req, res){
    var fileContent = req.body.content,
        fileName = req.body.fileName,
        filePath = jsonFolderPath + fileName;

    fs.writeFile(filePath, fileContent, function(err){
        if(err){
            console.log(err);
        }
        res.send({"success": true, "fileName": fileName});
    });

};

//渲染用户请求的页面
exports.renderPage = function(req, res) {
    var jspName = req.params.jspName.toLowerCase(),
        re = /\.jsp$/,
        viewsPath = path.normalize(__dirname + "/../views"),
        filePath = "",
        found = false;

    jspName += (re.test(jspName) ? "" : ".jsp");

    //找到文件
    walkFilePath(viewsPath, jspName);

    res.render(filePath, {
        layout: false
    });

    //遍历路径查找文件函数
    function walkFilePath(rootPath, fileName){
        
        if(!found){
            var currentDir = fs.readdirSync(rootPath);

            currentDir.forEach(function(fileName){
                var tempPath = rootPath + "/" + fileName;
                if(fs.statSync(tempPath).isFile()){
                    if(fileName == jspName){
                        found = true;
                        filePath = tempPath;
                    }
                }else{
                    walkFilePath(tempPath);
                }
            });
        }
    }

};

