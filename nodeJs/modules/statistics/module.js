var db = require('../../db');

function ReceiptParser() {}

ReceiptParser.prototype.add = function(data, email, callback) {
           var collor = data.color;
           var query = 'INSERT INTO receiptParser set date = "' + data.date + '", time="' + data.time + '", email = "' + email + '", market="' + data.market + '", item="' + data.item + '", price="'+ data.price + '"';
           db.query(query, function(err, success) {
               if ('function' === typeof callback) {
                   callback(err)
               }
           });
           callback('');
};

var query = db.query('SELECT * FROM receiptParser');

query.on('result', function(row) {
    db.pause();
    // Do some more processing on the row
    console.log(row);
    db.resume();
});

query.on('result', function(row) {
    console.log(row.post_title);
});

module.exports = new ReceiptParser();
