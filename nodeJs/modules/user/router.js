'use strict';
var express = require('express');
var controller = require('./controller')
var acl = require('../../components/acl');
var router = express.Router();

module.exports = function() {
  router.get('/', controller.get);
  router.post('/',  controller.signIn);  
  router.post('/statistics/',controller.signUp);

  return router;
};
