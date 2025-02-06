const express = require('express');
const { calculateGPA, saveGPA, getCGPA } = require('../controller/gpaController.js');
const router = express.Router();

router.post('/calculate', calculateGPA);
router.post('/save', saveGPA);
router.get('/cgpa', getCGPA);

module.exports = router;