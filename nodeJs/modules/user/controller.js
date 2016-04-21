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

module.exports.getLogin = function(req, res) {
      res.render('src/login.html');
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
           res.redirect('/login/#/loginError');
        }
    })(req, res, next);
};

module.exports.signUp = function(req, res) {
    var data = req.body;
    User.create(data, function(err) {
        if (err) {
            res.redirect('/login/#/registerError');
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
