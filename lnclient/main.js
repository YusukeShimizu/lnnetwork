var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 3002;

app.use(express.static('public'));

app.use(function(req,res,next){
    res.status(404).end('404 Notfound');
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});
