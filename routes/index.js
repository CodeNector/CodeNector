const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// API Routes
router.use('/api', apiRoutes);

// - Danny - 
// Route for registration 
router.post('/register', function(req, res) {
	// handle user information when they sign up
	console.log(req.body);
	
	//validation example. 
	var username = req.body.username;
	var password = req.body.password;
	var confirmpassword = req.body.confirmpassword;
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	
	// if fields are empty it will make an obect called 'errors' with the error message. 
	//{field: error message}
	req.checkBody('username', 'Name is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('confirmpassword', 'confirmpassword does not match password').equals(req.body.password);
	req.checkBody('firstName', 'Name is required').notEmpty();
	req.checkBody('lastName', 'Last Name is required').notEmpty();
	var errors = req.validationErrors();
	if(errors){
	  console.log('There was a validation error');
	  // respond with the errors object? - not working 
	  // need to bundle the errors into one bigger object. 
	  console.log("errors:" + errors);
	  res.json(errors);
	} else{
		var newUser = new User({
			username: username,
			password: password,
			firstName: firstName,
			lastName: lastName
		});

		// need to look to see if the username exists already here.. use the controller function and see if it returns anything. 
		User.getUserByUsername(newUser.username, function(err, user){
			console.log("REG - " + user);
			if(user){
				console.log("user exists - cannont use this user");
				res.json({userExists: "User already exists."})
			} else {
				User.createUser(newUser, function(err, user){
					if(err) throw err;
					console.log(user);
				});
				//need to redirect here.
				res.json({registrationSuccess: true});
			}
		})
	  }
});

// this is the passport local strategy. 
passport.use(new LocalStrategy(
	function(username, password, done) {
		User.getUserByUsername(username, function(err, user){
		if(err) throw err;
		//check to see if its not a user 
		if(!user){
			console.log("no user found"); 
			return done(null, false, {message: 'Unknown User.'});
		}

		// if there is an existing user then we need to compare the password. 
		User.comparePassword(password, user.password, function(err, isMatch){
			if(err) throw err;
			console.log("comparing pw is starting");
			//if the pw match then we return done wtih the user. else tell the user the pw was incorrect.
			if(isMatch){
				console.log("comparing pw is successful");
				return done(null, user);
			}
			else{
				console.log("comparing pw is unsuccessful");
				return done(null, false, {message: 'Password is incorrect.'})
			}
		})
		})
	}
));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});
	
passport.deserializeUser(function(id, done) {
	User.getUserById(id, function(err, user) {
		done(err, user);
	});
});

router.post('/login', passport.authenticate('local'), function(req, res) {
		// If this function gets called, authentication was successful.
		// `req.user` contains the authenticated user.

	res.json({
		user: {
			id: req.user._id,
			username: req.user.username,
			firstName:req.user.firstName,
			lastName:req.user.lastName
		},
		isLoginSuccessful: true
	})
	//this is supposed to redirect user to users/username - 
	console.log("login hit this part.")
});

// logout - might not need this. 
router.get('/logout', function(req, res){
	// code to handle logout. 
	req.logout();

	req.flash('success_msg', 'You are logged out.');
	res.send(console.log("logged out"));

});

// If no API routes are hit, send the React app
router.use(function (req, res) {
	console.log("user is logged in: " + ensureAuthenticated);
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// this function is supposed to see if the user is logged in or not. 
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){

		return next();
	} else {
		console.log("not logged in");
		res.json({loggedin: false});
	}
}

module.exports = router;