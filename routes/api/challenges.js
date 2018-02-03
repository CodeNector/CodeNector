const router = require('express').Router();
const challengeController = require('../../controllers/challengeController');

router
	.route('/')
	.get(challengeController.findAll);

module.exports = router;