const express = require('express');
const router = express.Router();
const employee = require('../controllers/employee')();

//Create User
router.post('/signup', employee.create);

//Login User
router.post('/login', employee.login);

//Refresh JWT token
router.post('/token', employee.refreshToken);

//User Logout
router.post('/logout', employee.logout);

module.exports = router;