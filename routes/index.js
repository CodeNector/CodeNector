const path = require("path");
const router = require("express").Router();
// const apiRoutes = require("./api");

// API Routes
// router.use("/api", apiRoutes);

// - Danny - 
// Route for registration 
router.post('/register', function(req, res) {
	// handle user information when they sign up
	console.log(req.body);
	
	
	// validation example. 
	// var name = req.body.name; 
	
	// req.checkBody('name', 'Name is required').notEmpty();
	// var errors = req.validationErrors();
	// if(errors){
	//   console.log('There was a validation error');
	// } else{
	//     console.log("no errors");
	//   }
  });

// If no API routes are hit, send the React app
router.use(function (req, res) {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;