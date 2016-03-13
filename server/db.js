var server = require('./serve');
var index = require('./index');
var mySql = require('mysql');
var db = mySql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'hdm'
});


db.query('CREATE TABLE IF NOT EXISTS user (email varchar(40) DEFAULT NULL, username varchar (17) DEFAULT NULL, password varchar(64) DEFAULT NULL, PRIMARY KEY(email));', function(err, success) {
		  		console.log(err, success); 
				});
module.exports = {mySql:db};
