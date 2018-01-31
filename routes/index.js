const path = require("path");
const router = require("express").Router();
// const apiRoutes = require("./api");
const User = require('../model/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// API Routes
// router.use("/api", apiRoutes);

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
	} else{
		console.log("no errors");
		var newUser = new User({
			username: username,
			password: password,
			firstName: firstName,
			lastName: lastName
		});
		
		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');
		//need to redirect here. 
		res.redirect('/');
	  }
});

// this is the passport local strategy. 
passport.use(new LocalStrategy(
	function(username, password, done) {
	  User.getUserByUsername(username, function(err, user){
		if(err) throw err;
		//check to see if its not a user 
		if(!user){
			return done(null, false, {message: 'Unknown User.'});
		}

		// if there is an existing user then we need to compare the password. 
		User.comparePassword(password, user.password, function(err, isMatch){
			if(err) throw err;

			//if the pw match then we return done wtih the user. else tell the user the pw was incorrect.
			if(isMatch){
				return done(null, user);
			}
			else{
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

router.post('/login', 
	passport.authenticate('local', {successRedirect: '/', faliureRedirect:'/login', failureFlash: true}),function(req, res) {
    // If this function gets called, authentication was successful.
	// `req.user` contains the authenticated user.
	
	console.log(req.body);
	//this is supposed to redirect user to users/username - 
    console.log("login hit this part.")
});

// If no API routes are hit, send the React app
router.use(function (req, res) {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;