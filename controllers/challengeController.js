const db = require('../models');

module.exports = {
	findAll(req, res) {
		db.Challenge
			.find(req.query)
			.then( dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));

	}
};