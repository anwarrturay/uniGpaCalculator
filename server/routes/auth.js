const express = require("express");
const router = express.Router();
const authController = require("../controller/authController")
const resetPassword = require("../controller/resetPasswordController");
const { forgotPassword } = require("../controller/usersController");

router.route('/').post(authController.handleLogin)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
router.route('/:token').post(authController.handleLogin)
module.exports = router;