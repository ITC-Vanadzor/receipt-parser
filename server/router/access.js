var acl = require('../components/acl');

var allowPoghos = function(req, res, next) {
    if (req.body.username === 'Poghos') {
        next();
    } else {
        res.end('du Poxos@ ches');
        return;
    }
};

acl.registerCondition('Poghos', allowPoghos);

module.exports = acl;