'use strict';
var myDb = require('../../db');
var db = require('../../db');
var User = require('./module');
var ReceiptParser = require('../statistics/module.js');
var jwt = require('express-jwt');
var joi = require('joi');
var passport = require('passport');
var jsonwebtoken = require('jsonwebtoken');
var Cookies = require( "cookies" )
var nJwt = require('njwt');


module.exports.get = function(req, res) {
    res.end('-----index-----');
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
var data = req.body;
console.log('---------------------------test login-------------------------------------------');
console.log(data);
console.log('---------------------------test login-------------------------------------------');
    passport.authenticate('local', function(err, user, message) {
        if (user) {
         //  var data = res.json({
         //      message: message,
         //      user: user,
         //      token: generateToken(user)
         //  });
            console.log('--------------------------------------------');
            console.log(message);
            res.render('src/statistic.html', {message: message,
                user: user,
                token: generateToken(user)});
        } else {
            res.end('cant\'t  logined');
        }
    })(req, res, next);
};


module.exports.addRow = function(req, res,next) {
   //var token = new Cookies(req,res).get('access_token');
   var verifiedJwt = nJwt.verify(req.headers['authorization'],'XXX');
   var data = req.body;
   //console.log(data);
   console.log(verifiedJwt);
   var email = verifiedJwt.body.email;
   console.log(email);
    ReceiptParser.add(data, email, function(err) {
        if (err) {
            res.end('can\'t add row')
        } else {
            res.end('added row');
        }
    });
};

module.exports.signUp = function(req, res) {

    console.log(req.user)
    var data = req.body;
    console.log(req.body.email);
    console.log('8888888888888888888888888');
    User.create(data, function(err) {
        if (err) {
            res.end('can\'t create user')
        } else {
            res.render('src/statistic.html', {
                token: generateToken(req.body.email)});
            //res.end('user was created');
        }
    });

};


var generateToken = function(user) {
    var token = jsonwebtoken.sign(user, 'XXX', {
        expiresInMinutes: 1200 //minit
    });
    console.log(token);
    return token;
};
