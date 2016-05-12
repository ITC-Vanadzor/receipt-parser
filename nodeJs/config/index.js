'use strict';
var valid = require('../modules/user/module');

var bodyParser = require('body-parser');
var express = require('express');
var multer = require('multer');
var path = require('path');
var appDir = path.dirname(require.main.filename);




module.exports = function(server) {
    // html renderer
    server.set('view engine', 'ejs');
    server.set('views', appDir + '/public/view');
    server.engine('html', require('ejs').renderFile);
    // for rendering static file
    server.use(express.static('./public'));
    server.use(express.static('./public/view'));



    // for parsing multipart/form-data
    var parser = multer();
    // for parsing application/json
    server.use(bodyParser.json({
        limit: '8mb'
    }));
    server.use(bodyParser.urlencoded({
        limit: '8mb',
        extended: true
    }));
    server.use(parser.array());
    return server;
};