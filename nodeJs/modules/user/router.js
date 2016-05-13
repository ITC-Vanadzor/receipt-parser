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
  router.get('/getuserdata/',controller.getUserData);
  router.get('/reset/:token',controller.reset);



  router.post('/registration/statistic/',  controller.signUp);  
  router.post('/login/statistic/',controller.signIn);
  router.post('/upload/',controller.getFile);
  router.post('/forgot/',controller.forgot);


  router.post('/setuserdata/',controller.setUserData);
  router.post('/setuserpassword/',controller.setUserPassword);
  router.post('/resetpassword/',controller.resetUserPassword);

  return router;
};
