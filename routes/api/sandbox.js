const router = require('express').Router();
const {VM} = require('vm2');
const vm = new VM({
	timeout: 1000,
	sandbox: {}
});

router
	.route('/')
	.post((req, res) => {
		// Runs user submitted code in vm on backend
		try {
			const executedCode = vm.run(req.body.code); 
			res.status(200).send(executedCode.toString());
			
		} catch (e) {
			if (e instanceof ReferenceError){
				res.status(200).send('Not valid JavaScript');
			} 
		}
	});


module.exports = router;
