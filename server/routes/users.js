const express = require('express');
const router = express.Router();
const { getSpecificUser, updateUserDetails, isNewController, contactUs, getUsers } = require('../controller/usersController');
const upload  = require("../middleware/multerConfig");
const ROLES_LIST = require("../config/roles_Lists")
const verifyRoles = require("../middleware/VerifyRoles");
const { postHistory, getHistory, deleteHistory } = require('../controller/historyController');

router.route('/is-new')
    .patch(verifyRoles(ROLES_LIST.USER), isNewController)  
    
router.route('/history/:userId')
    .get(verifyRoles(ROLES_LIST.USER), getHistory)
    .post(verifyRoles(ROLES_LIST.USER), postHistory)
    .delete(verifyRoles(ROLES_LIST.USER), deleteHistory)

router.route('/data')
    .get(verifyRoles(ROLES_LIST.ADMIN), getUsers)

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.USER), getSpecificUser)
    .patch(upload.single("image"), verifyRoles(ROLES_LIST.USER), updateUserDetails)

router.route('/contact-us')
    .post(verifyRoles(ROLES_LIST.USER), contactUs)
module.exports = router;