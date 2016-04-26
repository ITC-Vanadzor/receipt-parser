var allows = {};
var tokens={};
>>>>>>> RR-XX

function Acl() {}

Acl.prototype.registerCondition = function(name, callback) {
    if ('string' != typeof name) {
        throw new Error('name should be string');
    } else if ('function' != typeof callback) {
        throw new Error('callback should be function');
    } else if(allows[name]){
    	throw new Error('you already have such condition');
    }else {
        allows[name] = callback;
    }
};

Acl.prototype.allow = function(name) {
    if ('function' === typeof allows[name]) {
        return allows[name];
    } else {
        throw new Error('you haven\'t such canditions');
    }
};

Acl.prototype.setToken=function(email,token){
    tokens[email]=token;
}
Acl.prototype.getToken=function(email){
    return tokens[email];
}

module.exports = new Acl();
