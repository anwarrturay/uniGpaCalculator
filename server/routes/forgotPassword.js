const express = require("express");
const router = express.Router();
const usersController = require("../controller/usersController")

router.route('/').post(usersController.forgotPassword)

module.exports = router;