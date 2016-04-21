'use strict';
var express = require('express');
var controller = require('./controller')
var acl = require('../../components/acl');
var router = express.Router();

module.exports = function() {
  router.get('/', controller.get);

  router.get('/login/', controller.getLogin);
  router.get('/profile/', controller.getProfile);

  router.post('/registration/statistic/',  controller.signUp);  
  router.post('/login/statistic/',controller.signIn);

  return router;
};
