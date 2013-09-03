
var http = require("http"),
    path = require("path"),
    fs = require('fs');

//渲染用户请求的页面
exports.renderPage = function(req, resPage) {
    var jspName = req.params.jspName.toLowerCase(),
        re = /\.jsp$/,
        viewsPath = path.normalize(__dirname + "/../views"),
        filePath = "",
        found = false;

    jspName += (re.test(jspName) ? "" : ".jsp");

    //找jsp文件
    walkFilePath(viewsPath, jspName);

    if(filePath === ""){
        resPage.send(["没找到", jspName].join(""));
    }else{
        //请求json文件
        var jsonName = jspName.replace(re, ".json");
        http.get( "http://localhost:3000/get_file?fileName=" + jsonName, function(res) {
            res.on("data", function(data){
                var errorInfo = ["没找到", jsonName].join("");
                if(data == errorInfo){
                    resPage.send(errorInfo);
                }else{
                    var jsonData = JSON.parse(data);
                    resPage.render(filePath, jsonData);
                }
            });
        });
    }

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



