const express = require('express');
const router = express.Router();
const controllers = require('../controllers/transaction');

router.post('/', controllers.createTransactionController);
router.get('/', controllers.listTransactionController);
router.get('/:id', controllers.detailTransactionController);
router.put('/:id', controllers.updateTransactionController);
router.delete('/:id', controllers.deleteTransactionController);

module.exports = router;
