const express = require('express');
const router = express.Router();

router.use('/products', require('./product'));
router.use('/users', require('./user'));
router.use('/transactions', require('./transaction'));

module.exports = router;
