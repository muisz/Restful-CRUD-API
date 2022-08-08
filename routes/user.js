const express = require('express');
const router = express.Router();
const controllers = require('../controllers/user');

router.post('/', controllers.createUserController);
router.get('/', controllers.listUserController);
router.get('/:id', controllers.detailUserController);
router.put('/:id', controllers.updateUserController);
router.delete('/:id', controllers.deleteUserController);

module.exports = router;
