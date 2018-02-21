// model for user - this is bare min for login
const mongoose = require('mongoose');
const bcrpyt = require('bcryptjs');

// UserSchema
const UserSchema = mongoose.Schema({
	firstName: { type: String, unique: false },
	lastName: { type: String, unique: false },
	local: {
		username: { type: String, unique: false, required: false },
		password: { type: String, unique: false, required: false }
	},
	photos: []
	
});

UserSchema.pre('save', function(next) {
	if(!this.local.password) {
		console.log('no password provided');
		next();
	} else {
		this.local.password = this.hashPassword(this.local.password);
		next();
	}
});

module.exports = mongoose.model('User', UserSchema); 
