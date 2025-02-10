const express = require("express");
const router = express.Router();
const {handleNewUser, upload}  = require("../controller/registerController")
router.post('/',  upload.single("image"), handleNewUser)

module.exports = router;