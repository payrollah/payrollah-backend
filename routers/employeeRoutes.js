// Employee is deprecated

const express = require('express');
const router = express.Router();
const employee = require('../controllers/employee')();
const authenticateToken = require('./middlewares/auth');

//Create User
router.post('/signup', employee.create);

//Login User
router.post('/login', employee.login);

//Refresh JWT token
router.post('/token', employee.refreshToken);

//User Logout
router.post('/logout', employee.logout);

// Get Employee info
router.get('/employee', authenticateToken, employee.getEmployee);

module.exports = router;