// model for user - this is bare min for login
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

mongoose.promise = Promise;

// UserSchema
const UserSchema = new Schema({
	firstName: { type: String, unique: false },
	lastName: { type: String, unique: false },
	local: {
		username: { type: String, unique: false, required: false },
		password: { type: String, unique: false, required: false }
	},
	photos: []
	
});

UserSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.local.password);
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10);
	}
};

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
