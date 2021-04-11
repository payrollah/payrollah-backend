const express = require('express');
const router = express.Router();
const work = require('../controllers/work')();
const upload = require('../services/awsSdk')();
const authenticateToken = require('./middlewares/auth');

//Upload image
router.post('/upload',upload.upload.single('image'), work.create);

//Get Image
router.get('/getImage/:jobAddress/:task', authenticateToken, work.get);

//Get Watermark Image
router.get('/watermark/:hash', work.getWatermark);

module.exports = router;