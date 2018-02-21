// model for user - this is bare min for login
const mongoose = require('mongoose');
// const bcrpyt = require('bcryptjs');

// UserSchema
const UserSchema = mongoose.Schema({
	email: {type: String, index: true},
	password: {type: String},
	firstName: {type: String},
	lastName: {type: String}
});

module.exports = mongoose.model('User', UserSchema); 
