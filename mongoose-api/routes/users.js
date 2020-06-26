const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController')


router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.get('/email/:email', UserController.getByEmail);
router.post('/', UserController.register);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);



module.exports = router;
