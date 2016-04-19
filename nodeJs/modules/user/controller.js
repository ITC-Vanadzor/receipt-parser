'use strict';
var myDb = require('../../db');
var db = require('../../db');
var User = require('./module');
var jwt = require('express-jwt');
var joi = require('joi');
var passport = require('passport');
var jsonwebtoken = require('jsonwebtoken');


module.exports.get = function(req, res) {
      res.render('index.html');
};
module.exports.getUsage = function(req, res) {
      res.render('src/usage.html');
};
module.exports.getSignIn = function(req, res) {
      res.render('src/signin.html');
};
module.exports.getSignUp = function(req, res) {
      res.render('src/signup.html');
};
module.exports.getForgotPassword = function(req, res) {
      res.render('src/forgotpassword.html');
};
module.exports.getDownload = function(req, res) {
      res.render('src/download.html');
};
module.exports.getAbout = function(req, res) {
      res.render('src/about.html');
};
module.exports.getProfile = function(req, res) {
      res.render('src/profile.html');
};


module.exports.signIn = function(req, res,next) {
   var data = req.body;
    passport.authenticate('local', function(err, user, message) {
        if (user) {
            res.render('src/statistic.html', {
                token: generateToken(req.body.email)});
        } else {
           res.end('cant\'t  logined');
        }
    })(req, res, next);
};

module.exports.signUp = function(req, res) {
    var data = req.body;
    User.create(data, function(err) {
        if (err) {
            res.end('can\'t create user')
        } else {
            res.render('src/statistic.html', {
                token: generateToken(req.body.email)});
        }
    });

};

var generateToken = function(user) {
    var token = jsonwebtoken.sign(user, 'XXX', {
        expiresInMinutes: 12 //minit
    });
    return token;
};
