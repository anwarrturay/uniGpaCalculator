const express = require("express");
const router = express.Router();
const authController = require("../controller/authController")
const resetPassword = require("../controller/resetPasswordController");

router.route('/').post(authController.handleLogin)
router.route('/:token').post(authController.handleLogin)
router.route('/reset-password/:token').post(resetPassword)

module.exports = router;