const express = require('express');
const router = express.Router();

const { getUserImage } = require('../controller/getImageController');


router.route("/:id").get(getUserImage)

module.exports = router;