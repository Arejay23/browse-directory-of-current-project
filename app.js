var testFolder = './';
const fs = require('fs');
var express=require('express');
var app=express();
var server = require('http').createServer(app);
var io=require('socket.io').listen(server);

var port=3000;
app.set('view engine','pug');

server.listen(port); 

io.sockets.on('connection', function (socket) {
    console.log("Socket created");
    socket.on('link', function (data) {
        x=data.message;
        testFolder=x;
    })
});

var reg=/([A-Z]*[a-z]*)\.([a-z][a-z]*)/;
app.get('/',(req,res)=>{
    fs.readdir(testFolder, (err, files) => {
        if(err){
           res.render('end');
        }else{
            res.render('html',{file : files});
        }
      });
});
app.get('/a',(req,res)=>{
    fs.readdir(testFolder, (err, files) => {
        console.log(testFolder);
        if(reg.test(testFolder)){
           res.render('end');
        }else{
            res.render('html',{file : files});
        }
        testFolder='./';
      });
});