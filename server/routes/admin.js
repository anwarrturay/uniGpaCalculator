const express = require("express");
const verifyRoles = require("../middleware/VerifyRoles");
const ROLES_LIST = require("../config/roles_Lists");
const { updateRoles } = require("../controller/adminController");
const router = express.Router()

router.route('/').post(verifyRoles(ROLES_LIST.ADMIN), updateRoles);

module.exports = router