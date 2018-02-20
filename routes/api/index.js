const router = require('express').Router();
const challengesRoutes = require('./challenges');
const sandboxRoutes = require('./sandbox');


router.use('/challenges', challengesRoutes);
router.use('/sandbox', sandboxRoutes);

module.exports = router;

