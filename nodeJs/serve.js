'use strict';

var express = require('express');
var app = express();

require('./config/auth');

var server = require('http').createServer(app);
app = require('./config')(app);
require('./router/')(app);


server.listen(8085, 'localhost', function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
