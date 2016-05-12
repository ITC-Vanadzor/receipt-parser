'use strict';
var express = require('express');
var controller = require('./controller')
var acl = require('../../components/acl');
var router = express.Router();

module.exports = function() {
  router.get('/', controller.get);
  router.get('/login/', controller.getLogin);
  router.get('/profile/', controller.getProfile);
  router.get('/statistic/', controller.getStatistic);


  router.post('/registration/statistic/',  controller.signUp);  
  router.post('/login/statistic/',controller.signIn);
  router.post('/upload/',controller.getFile);
  router.post('/forgot/',controller.forgot);
  router.post('/reset/:token',controller.reset);

  router.post('/getuserdata/',controller.getUserData);
  router.post('/setuserdata/',controller.setUserData);
  router.post('/setuserpassword/',controller.setUserPassword);
  return router;
};
