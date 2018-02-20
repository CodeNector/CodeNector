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
		const executedCode = vm.run(req.body.code);
		console.log(executedCode);
		res.status(200).send(executedCode.toString());
	});


module.exports = router;
