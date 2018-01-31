// model for user - this is bare min for login
const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User); 