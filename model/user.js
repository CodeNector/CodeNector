// model for user - this is bare min for login
const mongoose = require('mongoose');
const bcrpyt = require('bcryptjs');

// UserSchema
var UserSchema = mongoose.Schema({
    username: {type: String, index: true},
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

// gets a user by the username
module.exports.getUserByUsername = function(username, callback){
    console.log("getting user by username");
    var query = {username: username};
    User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
    User.findbyid(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    // usebycrpt to check pw 
    console.log("comparing passsword - modals");
    bcrpyt.compare(candidatePassword, hash, function(err, isMatch){
        if(err) throw err;
        callback(null, isMatch);
    })
}