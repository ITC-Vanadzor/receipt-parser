'use strict';

var express = require('express');
var app = express();
var fs = require('fs');

require('./config/auth');


var options = {
   key  : fs.readFileSync('ssl.key'),
   cert : fs.readFileSync('ssl.crt'),
};



var server = require('https').createServer(options,app);
app = require('./config')(app);
require('./router/')(app);


server.listen(8085,'localhost', function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at https://%s:%s', host, port);
});



