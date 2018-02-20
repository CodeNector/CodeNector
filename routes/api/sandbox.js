const router = require('express').Router();
// const sandbox = require('../../lib/sandbox');
const {VM} = require('vm2');
const vm = new VM({
	timeout: 1000,
	sandbox: {}
});

router
	.route('/')
	.post((req, res) => {
		res.send('hello' + req.params);
		console.log(req.query.code);
	});


module.exports = router;
