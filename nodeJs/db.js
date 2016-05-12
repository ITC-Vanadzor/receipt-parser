var mySql = require('mysql');
var db = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'HDM'
});

module.exports = db;
