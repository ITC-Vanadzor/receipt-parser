var db = require('../../db');
var joi = require('joi');
var sha256 = require('js-sha256');

function User() {}

var userDataValidation = joi.object().keys({
    name: joi.string().alphanum().min(3).max(30),
    email: joi.string().email().required(),
    password: joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required()
});

var userEmailValidation = joi.object().keys({
    email: joi.string().email().required(),
});

User.prototype.getData=function(email){
	//TODO: will need to update with SQL 
    var result={};
    result.name='Victor';
    result.surname='Coy';
    result.birthday='21/06/1962';
    result.photo='coy.jpg';
    return result;
}

User.prototype.setData=function(email,data){
    console.log(email,'--setData--',data);
}

User.prototype.setPassword=function(email,data){
    console.log(email,'--setPass--',data);
}

User.prototype.saveActiveTocken = function(user, callback) {
    var query = 'SELECT * FROM reset_tokens WHERE u_id ="' + user.id + '"';
    var insertQuery = 'INSERT INTO reset_tokens (u_id,token) ' +
        ' VALUES(' + user.id + ',"' + user.resetPasswordToken + '"  )';
    db.query(query, function(err, rows) {
        var isExist = rows && rows.length ? rows[0] : null;
        if (null != isExist) {
            var insertQuery = 'UPDATE reset_tokens SET token="' +
                user.resetPasswordToken + '" WHERE user.u_id=' + user.id;
        }
    });
    db.query(query, function(err, rows) {
        callback(err, user);
    });
}

User.prototype.addResetToken = function(user, callback) {
	var insertQuery = 'INSERT INTO reset_tokens (u_id,token) '
		+ ' VALUES(' + user.id+ ',"' + user.resetPasswordToken +'"  )' ;
	console.log("INFO:"," Add reset pass token ... " + insertQuery );
	db.query(insertQuery, function(err, rows) {
		if (err) {
			insertQuery = 'UPDATE reset_tokens SET token="' 
				+ user.resetPasswordToken + '" WHERE u_id=' + user.id ;
			db.query(insertQuery, function(err, rows) {
				callback(err, user);
			});
		} else {
			callback(err, user);
		}
	});
};

User.prototype.findOne = function(data, callback) {
	//TODO: validate email
	validateEmailData(data, function(err, data) {
		if (err) 
			callback("ERROR:"," Incorrect email format: "
			 + err, data);
	});
	var password = transformPasword(data.password);
	encodePassword = sha256(password);
	var query = 'SELECT * FROM user WHERE email ="' + data.email + '"';
	db.query(query, function(err, rows) {
		var user = rows && rows.length ? rows[0] : null;
		callback(err, user);
	});
};

User.prototype.findOneByToken = function(data, callback) {
	console.log("INFO:"," Reset token validation ... " + data.resetPasswordToken);
	var query = 'SELECT * FROM reset_tokens WHERE token ="' 
		+ data.resetPasswordToken + '"';
	db.query(query, function(err, rows) {
		var isExist = rows && rows.length ? rows[0] : null;
		if ((!isExist) || (err)) {
			callback("ERROR:","There was either an issue with given token or it is invalid."  + err );
		} else {
			jsonwebtoken.verify(data.resetPasswordToken, rows[0].u_id.toString(), function (err, decode) {
				if (err) {
					callback(err, data);
				} else {
					if (data.resetPasswordExpires - decode > 3600000) {
						callback("Token is old.", data);
					} else {
						callback("", rows.u_id);
					}
				}
			});
		}
	});
};

User.prototype.create = function(data, callback) {
    validateUserData(data, function(err, data) {
        if (!err) {
            var password = transformPasword(data.password);
            encodePassword = sha256(password);
            var query = 'INSERT INTO user set email = "' + data.email + '", username="' + data.name + '", password = "' + encodePassword + '"';
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
            var query = 'SElECT * from user where email = "' + data.email + '" and password="' + password + '"';
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
    joi.validate(data, userDataValidation, function(err, data) {
        callback(err, data)
    });
};

var validateEmailData = function(data, callback) {
    joi.validate(data, userEmailValidation, function(err, data) {
        callback(err, data)
    });
};

function transformPasword(password) {
    //TODO transf alg
    return password + 'tux';
}

module.exports = new User();
