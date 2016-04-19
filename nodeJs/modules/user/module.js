var db = require('../../db');
var joi = require('joi');
var sha256 = require('js-sha256');

var joiSchema = joi.object().keys({
    name: joi.string().alphanum().min(3).max(30),
    email: joi.string().email().required(),
    password: joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required()
});

function User() {}



User.prototype.create = function(data, callback) {
    validateUserData(data, function(err, data) {
        if (!err) {
            var password = transformPasword(data.password);
            encodePassword = sha256(password);
            var query = 'INSERT INTO accounts set email = "' + data.email + '", username="'+data.name+'", password = "' + encodePassword + '"';
            db.query(query, function(err, success) {
                if ('function' === typeof callback) {
                    
                    callback(err)
                }
            });
        } else {
            if ('function' === typeof callback) {
                callback('validtion error')
            }
        }
    });
};

User.prototype.signin = function(data, callback) {
    validateUserData(data, function(err, data) {
        if (!err) {
            var password = transformPasword(data.password);
            password = sha256(password);
            var query = 'SElECT * from hdm.accounts where email = "' + data.email + '" and password="' + password + '"';
            db.query(query, function(err, rows) {
                var user = rows && rows.length ? rows[0] : null;

                callback(err, user);
            });
        } else {
            callback('validtion error');
        }
    });
};



var validateUserData = function(data, callback) {
    joi.validate(data, joiSchema, function(err, data) {
        callback(err, data)
    });
};


function transformPasword(password) {
    //TODO transf alg
    return password+'tux';
}

module.exports = new User();
