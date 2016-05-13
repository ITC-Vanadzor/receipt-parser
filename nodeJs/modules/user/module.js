var db = require('../../db');
var joi = require('joi');
var sha256 = require('js-sha256');
var jsonwebtoken = require('jsonwebtoken');
var base64 = require('node-base64-image');

function User() {}

var userDataValidation = joi.object().keys({
    name: joi.string().alphanum().min(3).max(30),
    email: joi.string().email().required(),
    password: joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required()
});

var userEmailValidation = joi.object().keys({
    email: joi.string().email().required(),
});

var getUserIDByEmail = function(email, callback) {
    var query = "SELECT id FROM user WHERE email='" + email + "'";
    console.log("------------ query " + query);
    db.query(query, function(err, rows) {
        console.log("_----- " + err + " --- " + rows[0].id + ' --- em ' + email);
        callback(err, rows[0].id);
    });
}

User.prototype.getData=function(email,callback){
    var query = "SELECT * FROM account_extend WHERE email='" + email + "'";
    db.query(query, function(err, rows) {
            var result={};
        if (!err) {
            result = rows[0];
            result.photo = "coy.jpg"; //rows[0].image;
        }
        callback(err,result);
    });
}
var savePhoto=function(data,callback){
    //TODO
    var imageData=new Buffer(data.replace("data:image/jpeg;base64,",'').split(' ').join('+'), 'base64');
    var options={};
    var pName='userid_'+Date.now();

    var forSend='resources/avatar/'+pName;
    options.filename = 'public/'+forSend;



    base64.base64decoder(imageData, options, function (err, saved) {
        if (err) { 
            console.log(err); 
            callback('...');
        } 
        else{
            callback(forSend +'.jpg');
        } 
    });  
}


User.prototype.setData=function(email,data,callback){
    console.log(email,'--setData--',data);
    getUserIDByEmail(email, function(err,u_id) {
        console.log("------------1 user " + u_id);
        if (u_id) {
            if(data.photo.search('base64')!=-1){
                savePhoto(data.photo,function(fpath){
                    if(fpath){
                    var delQuery = "DELETE FROM account WHERE u_id=" + u_id ;
                    var query = "Insert into account(u_id, f_id, f_value) values "
                    + " (" + u_id + ", 1, '" + data.Surname + "')"
                    + " ,(" + u_id + ", 2, '" + data.Birthday + "')"
                    + " ,(" + u_id + ", 3, '" + fpath + "')";

                       console.log('Query Del: ',delQuery);
                        console.log('Query : ',query);
                        db.query(delQuery, function(err, rows) {
                            db.query(query, function(err, rows) {
                                callback(err);
                            });
                            callback(err);
                        });

                    }

                });
            }
            else{
                    var delQuery = "DELETE FROM account WHERE u_id=" + u_id + " AND f_id!=3" ;
                     var query = "Insert into account(u_id, f_id, f_value) values "
                    + " (" + u_id + ", 1, '" + data.Surname + "')"
                    + " ,(" + u_id + ", 2, '" + data.Birthday + "')";
                                console.log('Query Del: ',delQuery);
            console.log('Query : ',query);
            db.query(delQuery, function(err, rows) {
                db.query(query, function(err, rows) {
                    callback(err);
                });
                callback(err);
            });
            }


        }
        callback(err);
     });
}

User.prototype.setPassword=function(email,data){
    var trPass = transformPasword(data.newpass);
    var encodePassword = sha256(trPass);
    var query = "UPDATE user SET password='"+ encodePassword +"' WHERE email='" + email + "'";
    db.query(query, function(err, rows) {
        if (err) {
            console.log('ERROR: ' + err);
        } else {
            console.log('INFO: updated correctly.');
        }
        return err;
    });
}

User.prototype.updatePassword = function(u_id,data){
    var trPass = transformPasword(data.newPassword);
    var encodePassword = sha256(trPass);
    var query = "UPDATE user SET password='"+ encodePassword +"' WHERE id='" + u_id + "'";
    db.query(query, function(err, rows) {
        if (err) {
            console.log('ERROR: ' + err);
        } else {
            console.log('INFO: updated correctly.');
        }
        return err;
    });
}

User.prototype.checkPassword =function(email,password, callback){
    var trPass = transformPasword(password);
    var encodePassword = sha256(trPass);
    var query = "SELECT password FROM user WHERE  email='" + email + "'";
    db.query(query, function(err, rows) {
        if (!err) {
            if (rows[0].password == encodePassword) {
                callback("");
            } else {
                callback("ERROR: Old password is incorrect.");
            }
        }
        callback(err);
    });
}

User.prototype.saveActiveTocken = function(user, callback) {
    var query = 'SELECT * FROM reset_tokens WHERE u_id ="' + user.id + '"';
    var insertQuery = 'INSERT INTO reset_tokens (u_id,token) ' +
        ' VALUES(' + user.id + ',"' + user.resetPasswordToken + '"  )';
    db.query(query, function(err, rows) {
        var isExist = rows && rows.length ? rows[0] : null;
        if (null != isExist) {
            insertQuery = 'UPDATE reset_tokens SET token="' +
                user.resetPasswordToken + '" WHERE u_id=' + user.id;
        }
        db.query(insertQuery, function(err, rows) {
            callback(err, user);
        });
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
			callback("ERROR:There was either an issue with given token or it is invalid." );
		} else {
        var decode =jsonwebtoken.decode(data.resetPasswordToken);
        console.log("----------------- decode " + decode);
    		if (data.resetPasswordExpires - decode > 3600000) {
    			callback("Token is old.");
    		} else {
    			callback("", rows[0].u_id);
			}
    	}
	});
};

User.prototype.findOneByTempToken = function(data, callback) {
    console.log("INFO:"," Reset token validation ... " + data.resetPasswordToken);
    var query = 'SELECT * FROM reset_tokens WHERE token ="' 
        + data.resetPasswordToken + '"';
    db.query(query, function(err, rows) {
        var isExist = rows && rows.length ? rows[0] : null;
        if ((!isExist) || (err)) {
            callback("ERROR:There was either an issue with given token or it is invalid." );
        } else {
            callback("", rows[0].u_id);
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
