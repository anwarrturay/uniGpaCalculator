const express = require('express');
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");

const { getSpecificUser } = require('../controller/usersController');


router.route("/:id").get(verifyJWT, getSpecificUser)

module.exports = router;