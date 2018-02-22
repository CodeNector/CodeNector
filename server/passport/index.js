const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const User = require('../../models/user');

passport.serializeUser((user,done) => {
	console.log(user, 'seralized'); //raw user object
	done(null, { _id: user._id });
});

passport.deserializeUser((id, done) => {
	console.log('deserialize');
	User.findOne(
		{ _id: id },
		'firstName lastName photos local.username',
		(err, user) => {
			console.log(user, 'deserialized');
			done(null, user);
		}
	);
});

passport.use(LocalStrategy);

module.exports = passport;