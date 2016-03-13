'use strict';
var util = require('util');
var eventEmiter = require('events');
var express = require('express');
var app = express();
var db = require('./db');
var server = require('http').createServer(app);
app = require('./config')(app);
app = require('./config/auth')(app);
require('./router/')(app);


server.listen(8080, 'localhost', function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
