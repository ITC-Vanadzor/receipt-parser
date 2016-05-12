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
var smtpTransport = require("nodemailer-smtp-transport")


module.exports.get = function(req, res) {
      res.render('index.html');

};

module.exports.getLogin = function(req, res) {
      res.render('src/login.html');
};

module.exports.getProfile = function(req, res) {
    console.log('Profile heaser: ',req.headers);
	res.render('src/profile.html');
};

module.exports.signIn = function(req, res,next) {
   var data = req.body;
    passport.authenticate('local', function(err, user, message) {
        if (user) {
            tokens.setToken(user.email,generateToken(user.email));
            res.setHeader('token', tokens.getToken(user.email));
            res.render('src/statistic.html');
        } else {
            console.log("chexav",req.body);
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

module.exports.forgot = function(req, res, next) {
	async.waterfall([
		function(done) {
			User.findOne({ email: req.body.email }, function(err, user) {
				if ((err) || (!user)) {
				   console.log('ERROR:', 'No account with that email address exists.');
				   return res.redirect('login/#/forgotpassword');
				}
				
				var token = generateToken(user.id);
				user.resetPasswordToken = token;
				user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
				
				User.addResetToken(user, function(err) {
					if (err)
						console.log('ERROR:',"Couldn't save the token: " + err);
					done(err,token, user);
				});
			});
		},
		function(token, user, done) {
		  var smtpTransport = nodemailer.createTransport('SMTP', {
		    service: 'Gmail',
		    auth: {
		      user: 'nanenare@gmail.com',
		      pass: '####PASS####'
		    }
		  });
		  var mailOptions = {
		    to: user.email,
		    from: 'nanenare@gmail.com',
		    subject: 'Node.js Password Reset',
		    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
		      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
		      'http://' + req.headers.host + '/reset/' + token + '\n\n' +
		      'If you did not request this, please ignore this email and your password will remain unchanged.\n'
		  };
		  smtpTransport.sendMail(mailOptions, function(err) {
		    console.log('INFO:', 'An e-mail has been sent to ' + user.email 
				+ ' with further instructions.');
		    done(err, 'done');
		  });
		}
	], function(err) {
	  if (err) 
	    return next(err);
	  res.redirect('login/#/forgotpassword');
	});
};

module.exports.reset = function(req, res) {
  User.findOneByToken({ 
    resetPasswordToken: req.params.token, 
    resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (err) {
      console.log('ERROR:', 'Password reset token is invalid or has expired.');
      return res.redirect('login/#/forgotpassword');
    }
// res.render('login/#/resetpassword', {
//   user: user
// });
  });
};

var generateToken = function(user) {
	var token = jsonwebtoken.sign(new Date().getTime().toString(), user.toString());
    return token;
};
