const express = require('express');
const router = express.Router();
const company = require('../controllers/company')();

//Create User
router.post('/signup', company.create);

//Login User
router.post('/login', company.login);

//Refresh JWT token
router.post('/token', company.refreshToken);

//User Logout
router.post('/logout', company.logout);

module.exports = router;