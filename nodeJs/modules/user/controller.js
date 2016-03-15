'use strict';
var myDb = require('../../db');
var db = require('../../db');
var User = require('./module');
var jwt = require('express-jwt');
var joi = require('joi');
var passport = require('passport');
var jsonwebtoken = require('jsonwebtoken');


module.exports.get = function(req, res) {
    res.end('-----index-----');
};

module.exports.signIn = function(req, res,next) {
   var data = req.body;
   console.log(data);
    passport.authenticate('local', function(err, user, message) {
        if (user) {
            // res.json({
            //     message: message,
            //     user: user,
            //     token: generateToken(user)
            // });
            res.render('src/statistic.html');
        } else {
            res.end('cant\'t  logined');
        }
    })(req, res, next);
};

module.exports.signUp = function(req, res) {

    console.log(req.user)
    var data = req.body;
    User.create(data, function(err) {
        if (err) {
            res.end('can\'t create user')
        } else {
            res.end('user was created');
        }
    });

};


var generateToken = function(user) {
    var token = jsonwebtoken.sign(user, 'XXX', {
        expiresInMinutes: 12 //minit
    });
    console.log(token);
    return token;
};