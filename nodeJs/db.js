var mySql = require('mysql');
var db = mySql.createConnection({
    host: 'localhost',
    user: 'hdmUser',
    password: 'hdmpassword',
    database: 'hdmUsers'
});

db.query('CREATE TABLE IF NOT EXISTS accounts(\
	email varchar(50) DEFAULT NULL,\
	username varchar(20) DEFAULT NULL,\
	password varchar(256) DEFAULT NULL,\
	PRIMARY KEY(email));', function(err, succ) {
    console.log(err, succ);
});

module.exports = db;