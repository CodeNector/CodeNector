// model for user - this is bare min for login
const mongoose = require('mongoose');
const bcrpyt = require('bcryptjs');

// UserSchema
var UserSchema = mongoose.Schema({
    username: {type: String},
    password: {type: String},
    firstName: {type: String},
    lastName: {type: String}
});

var User = module.exports = mongoose.model('User', UserSchema); 

// - Danny 
// this is going to encrypt the password cause we dont want to store it in plain text
module.exports.createUser = function (newUser, callback){
    bcrpyt.genSalt(10, function(err, salt){
        bcrpyt.hash(newUser.password, salt, function(err, hash){
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}