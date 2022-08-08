const express = require('express');
const router = express.Router();
const controllers = require('../controllers/product');

router.post('/', controllers.createProductController);

module.exports = router;
