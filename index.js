var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();

app.use('/', express.static(path.join(__dirname, 'public')
    // , {etag: false}
    , {maxAge: 1000 * 60 * 60}
    // , {maxAge: '2h'}
    //W/"1ae7-15c05ea4276"

));
app.set('port', (process.env.PORT || 3000));


//处理Ajax请求
app.post('/about', function (req, res) {
    res.send("test ajax by jquery");
});
app.get('/xhttp', function (req, res) {
    res.send('XMLHttPRequest请求成功');
})

//socket.io实现websocket连接
var server = require('http').Server(app);
var io = require('socket.io')(server);
io.on('connection', function (socket) {
    socket.emit('news', {serverToClient: 'this news ig from server to client'});
    socket.on('anotherNews', function (data) {
        console.log(data);
    });
});
//这里将原本的app改为server
server.listen(app.get('port'), function () {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});