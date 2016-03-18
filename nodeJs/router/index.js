'use strict';
var acl = require('./access')
var router = require('../modules/user/router');
var jwt = require('express-jwt');

var jwtConf = {
	secret: 'secretsecretsecretsecret',
  	credentialsRequired: false,
	getToken: function(req) {
		if(req.headers && req.headers['x-auth']) {
			return 'wdw';
		}
		return false;
	}
};


module.exports = function (app) {
	app.use(
		jwt(jwtConf)
		.unless({path:['/user/registration']})
		);
	app.use('/user', router());
}