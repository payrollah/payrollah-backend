const express = require('express');
const router = express.Router();
const user = require('../controllers/user')();

//Create user
router.post('/signup', user.create);

//Login User
router.post('/login', user.login);

//Login User
router.post('/token', user.refreshToken);

//Login User
router.post('/logout', user.logout);

module.exports = router;