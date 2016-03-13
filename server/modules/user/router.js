'use strict';
var express = require('express');
var controller = require('./controller')
var router = express.Router();
var acl = require('../../components/acl');

module.exports = function() {
  // router.get('*', acl.allow('Poghos'));
  // router.post('*', acl.allow('Poghos'));
  router.get('/', controller.get);

  router.get('/:id', controller.getById);

  router.post('/', controller.create);
  router.post('/login', controller.login);
  router.post('/registration', controller.registration);
  
  router.put('/', function(req, res){
  	res.end('----put----');
  });
  router.delete('/', function(req, res) {
  	res.end('---delete---');
  });
  return router;
};
