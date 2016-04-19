'use strict';
var express = require('express');
var controller = require('./controller')
var acl = require('../../components/acl');
var router = express.Router();

module.exports = function() {
  router.get('/', controller.get);

  router.get('/usage/', controller.getUsage);
  router.get('/signin/', controller.getSignIn);
  router.get('/signup/', controller.getSignUp);
  router.get('/forgotpassword/', controller.getForgotPassword);
  router.get('/about/', controller.getAbout);
  router.get('/download/', controller.getDownload);
  router.get('/profile/', controller.getProfile);

  router.post('/registration/statistic/',  controller.signUp);  
  router.post('/login/statistic/',controller.signIn);

  return router;
};
