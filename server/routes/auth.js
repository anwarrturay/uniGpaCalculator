const express = require("express");
const router = express.Router();
const authController = require("../controller/authController")
const usersController = require("../controller/usersController");
const resetPassword = require("../controller/resetPasswordController");

router.route('/').post(authController.handleLogin)
router.route('/:token').post(authController.handleLogin)
router.post('/forgot-password', usersController.forgotPassword)
router.post('/reset-password/:token', resetPassword)
module.exports = router;