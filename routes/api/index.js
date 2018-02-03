const router = require('express').Router();
const challengesRoutes = require('./challenges');

router.use('/challenges', challengesRoutes);

module.exports = router;

