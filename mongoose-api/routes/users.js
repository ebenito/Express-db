const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController')


router.post('/', UserController.register);



module.exports = router;
