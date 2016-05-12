'use strict';
var db = require('../../db');
var tokens = require('../../components/acl');
var User = require('./module');
var jwt = require('express-jwt');
var joi = require('joi');
var passport = require('passport');
var jsonwebtoken = require('jsonwebtoken');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var smtpTransport = require("nodemailer-smtp-transport");
var fs = require('fs');
var base64 = require('node-base64-image');
var exec = require('child_process').exec;
var cookie = require('cookie');

function puts(error, stdout, stderr) { 
    if(error){
        console.log(error);
     }
     else{
        console.log(stdout);
        console.log(stderr);        
     }
 }

 function ImageDataParser(imagePath){
    var command="tesseract "+imagePath+" tmp"
    exec(command, puts);
 }




module.exports.get = function(req, res) {
    res.render('src/login.html');

};

module.exports.getFile = function(req, res) {
    var imageData = Object.keys(req.body)[0];
    imageData=new Buffer(imageData.replace("data:image/jpeg;base64,",'').split(' ').join('+'), 'base64');
    var options={};
    options.filename = 'resources/receipt/userid_'+Date.now();
 
    base64.base64decoder(imageData, options, function (err, saved) {
        if (err) { 
            console.log(err); 
        } 
        else{
            ImageDataParser(options.filename+'.jpg');
        } 
    });  
    res.end();

};
module.exports.getLogin = function(req, res) {
    res.render('src/login.html');
};

module.exports.getStatistic = function(req, res) {
    res.render('src/statistic.html');
};


module.exports.getProfile = function(req, res) {
    res.render('src/profile.html');
};

module.exports.signIn = function(req, res, next) {
    var data = req.body;
    passport.authenticate('local', function(err, user, message) {
        if (user) {
            tokens.setToken(user.email, generateToken(user.email));
            res.setHeader('token', tokens.getToken(user.email));
            res.end();
        } else {
            res.end();
        }
    })(req, res, next);
};

module.exports.signUp = function(req, res) {
    var data = req.body;
    User.create(data, function(err) {
        if (err) {
            res.end();
        } else {
            tokens.setToken(data.email, generateToken(data.email));
            res.setHeader('token', tokens.getToken(data.email));
            res.end();
        }
    });

};

module.exports.forgot = function(req, res, next) {
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = generateToken(req.body.email);
                done(err, token);
            });
        },
        function(token, done) {
            User.findOne({
                email: req.body.email
            }, function(err, user) {
                if (!user) {
                    console.log('error', 'No account with that email address exists.');
                    return res.redirect('/login/#/forgotpassword');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                User.saveActiveTocken(user, function(err) {
                    if (err)
                        console.log("Couldn't save the tocken: " + err);
                    done(err, token, user);
                });
            });
        },
        function(token, user, done) {
            var smtpTransport = nodemailer.createTransport('SMTP', {
                service: 'Gmail',
                auth: {
                    user: 'hdmnaahgm@gmail.com',
                    pass: 'superteam6'
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'nanenare@gmail.com',
                subject: 'Node.js Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'https://' + req.headers.host + '/login/#/reset:' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                console.log('info', 'An e-mail has been sent to ' + user.email +
                    ' with further instructions.');
                done(err, 'done');
            });
        }
    ], function(err) {
        if (err)
            return next(err);
        res.redirect('/');
    });
};

module.exports.reset = function(req, res) {
    User.findOneByToken({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
            $gt: Date.now()
        }
    }, function(err, user) {
        if (!user) {
            console.log('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/login/#/forgotpassword');
        }
    });
};


module.exports.getUserData=function(req, res) {
    var cookies = cookie.parse(req.headers.cookie);
    var token=cookies.HDMtoken;
    console.log(token);

    if(token.length>10){
        var dec=jsonwebtoken.decode(token,{complete: true});
        res.send(User.getData(dec.payload));
    }    


    res.end();

}

module.exports.setUserData=function(req, res) {
    var token=req.headers.cookie;
    if(token.length>10){
        token=token.slice(9,token.length);

        var dec=jsonwebtoken.decode(token,{complete: true});
        res.send(User.setData(dec.payload,req.body));
    }    


    res.end();
}

module.exports.setUserPassword=function(req, res) {
    var token=req.headers.cookie;
    if(token.length>10){
        token=token.slice(9,token.length);

        var dec=jsonwebtoken.decode(token,{complete: true});
        res.send(User.setPassword(dec.payload,req.body));
    }    


    res.end();
}

var generateToken = function(user) {
	var token = jsonwebtoken.sign(new Date().getTime().toString(), user.toString());
	return token;
};
