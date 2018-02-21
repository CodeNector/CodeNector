const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const passport = require('passport');

router.get('/user', (req, res) => {
	console.log(req.user, 'user');
	if(req.user) return res.json({ user: req.user});
	else return res.json({ user: null });
});

router.post(
	'/login',
	function(req, res, next) {
		console.log(req.body);
		next();
	},
	passport.authenticate('local'),
	(req, res) => {
		console.log('Post to /login')
		const user = JSON.parse(JSON.stringify(req.use));
		const cleanUser = Object.assign({}, user);
		if (cleanUser.local) {
			console.log(`Deleting ${cleanUser.local.passport}`);
			delete cleanUser.local.password;
		}
		res.json({ user: cleanUser });
	}
);

router.post('/signup', (req, res) => {
	const {	username, password } = req.body;

	User.findOne({ 'local.username': username }, (err, userMatch) => {
		if (userMatch) 
			return res.json({
				error: `Sorry, there's already a user named: ${username}`
			});
		const newUser = new User({
			'local.username': username,
			'local.password': password
		});
		newUser.save((err, savedUser) => {
			if (err) return res.json(err);
			return res.json(saveduser);
		})

		
	})
})
module.exports = router;
