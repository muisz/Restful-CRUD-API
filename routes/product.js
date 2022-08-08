const express = require('express');
const router = express.Router();
const controllers = require('../controllers/product');

router.post('/', controllers.createProductController);
router.get('/', controllers.listProductController);
router.get('/:id', controllers.detailProductController);
router.put('/:id', controllers.updateProductController);
router.delete('/:id', controllers.deleteProductController);

module.exports = router;
