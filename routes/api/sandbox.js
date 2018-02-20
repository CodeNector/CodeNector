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
		// Runs user submitted code in vm on backend
		const executedCode = vm.run(req.body.code) || 'Not valid JavaScript'; 
		res.status(200).send(executedCode.toString());
	});


module.exports = router;
