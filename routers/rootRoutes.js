const express = require('express');
const router = express.Router();

//Status OK
router.get('/', (req, res) => res.json({ status: "OK" }));

module.exports = router;