const express = require("express");
const router = express.Router();
const {handleNewUser}  = require("../controller/registerController")
const upload  = require("../middleware/multerConfig")

router.route('/')
    .post(upload.single("image"), handleNewUser)


module.exports = router;