//requires
var express = require ('express');
var app = express();
var pg = require ('pg');
var path = require('path');
var bodyParser = require ('body-parser');

//port
var port = 8888;

var config = {
  database: 'pets',
  host: 'localhost',
  port: 5432,
  max: 12

};// end config


// uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


//create server
app.listen (port, function(){
  console.log('server up on:', port);

});// end app.listen

app.get('/', function(req, res){
  console.log('/ hit');
  res.sendFile(path.resolve('public/views/index.html'));
});
