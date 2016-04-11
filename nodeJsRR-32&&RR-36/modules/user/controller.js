'use strict';
var myDb = require('../../db');
var db = require('../../db');
var User = require('./module');
var jwt = require('express-jwt');
var joi = require('joi');
var passport = require('passport');
var jsonwebtoken = require('jsonwebtoken');


module.exports.get = function(req, res) {
      res.status(200).send([ {
        market: 'First',
        date: '12-01-2016',
        time: '12:01',
        money: '5000',
        item: 'empty',
        path: 'photo0001.jpg'
    },
     {
        market: 'Second',
        date: '12-02-2016',
        time: '12:01',
        money: '18000',
        item: 'empty',
        path: 'photo0001.jpg'
    },
     {
        market: 'Third',
        date: '12-03-2016',
        time: '12:01',
        money: '13000',
        item: 'empty',
        path: 'photo0001.jpg'
    },
     {
        market: 'Four',
        date: '12-04-2016',
        time: '12:01',
        money: '25000',
        item: 'empty',
        path: 'photo0001.jpg'
    },
     {
        market: 'Five',
        date: '12-05-2016',
        time: '12:01',
        money: '8000',
        item: 'empty',
        path: 'photo0001.jpg'
    }])
};


module.exports.signIn = function(req, res,next) {
   console.log("-----------------------");
   var data = req.body;
   console.log(data);
    passport.authenticate('local', function(err, user, message) {
        if (user) {
            // res.json({
            //     message: message,
            //     user: user,
            //     token: generateToken(user)
            // });
            res.render('view/src/statistic.html');
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
