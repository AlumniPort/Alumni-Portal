const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/verify', userController.verifyUser);
router.post('/signup', userController.signupUser);
router.post('/login', userController.loginUser);

module.exports = router;
