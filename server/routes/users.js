const express = require('express');
const router = express.Router();
const { getSpecificUser, updateUserDetails, isNewController } = require('../controller/usersController');
const upload  = require("../middleware/multerConfig");
const ROLES_LIST = require("../config/roles_Lists")
const verifyRoles = require("../middleware/VerifyRoles")

router.route('/is-new')
    .patch(verifyRoles(ROLES_LIST.USER), isNewController)    

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.USER), getSpecificUser)
    .patch(upload.single("image"), verifyRoles(ROLES_LIST.USER), updateUserDetails)
module.exports = router;