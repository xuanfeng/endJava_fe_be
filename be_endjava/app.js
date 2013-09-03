
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var ejs = require('ejs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
// app.engine('.html', ejs.renderFile);
// app.set('view engine', 'html');
app.engine('jsp',require('endskin').__express);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//服务端的需求
app.get('/', routes.getIndexPage);  //直接去routes目录下的index.js来搜索处理函数的名称
app.get('/create_json', routes.createJsonFile);
app.get('/get_file_list', routes.getJsonFileList);
app.get('/get_file', routes.getJsonFile);
app.post('/save_file', routes.saveJsonFile);
// app.get('/json/:jsonName', routes.getJsonFileForRender);
//本地的需求
app.get('/page/:jspName', routes.renderPage);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
