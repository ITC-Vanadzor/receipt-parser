var mySql = require('mysql');
var db = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'hdm'
});

db.query('CREATE TABLE IF NOT EXISTS accounts(\
	email varchar(50) DEFAULT NULL,\
	username varchar(20) DEFAULT NULL,\
	password varchar(256) DEFAULT NULL,\
	PRIMARY KEY(email));', function(err, succ) {
});

db.query('CREATE TABLE IF NOT EXISTS receiptParser(\
        ID int NOT NULL AUTO_INCREMENT,\
        date date DEFAULT NULL,\
        time time DEFAULT NULL,\
        email varchar(50) DEFAULT NULL,\
        market varchar(256) DEFAULT NULL,\
        item varchar(256) DEFAULT NULL,\
        price integer DEFAULT NULL,\
        PRIMARY KEY(id));', function(err, succ) {
});


module.exports = db;
