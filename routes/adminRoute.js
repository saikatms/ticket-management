const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const schemaValidator = require("./../middleware/SchemaValidator");

const requireAuth = require("../middleware/checkAuth");
const requireRole = require("../middleware/checkRole");
router.post(
  "/createUser",
  schemaValidator.userValidation,
  requireAuth,
  requireRole(["admin"]),
  adminController.createUser
);

router.patch(
  "/updateUser",
  schemaValidator.updateUserValidation,
  requireAuth,
  requireRole(["admin", "user", "project-admin"]),
  adminController.updateUser
);
router.delete(
  "/deleteUsers",
  // schemaValidator.deleteUsersValidation,
  requireAuth,
  requireRole(["admin"]),
  adminController.deleteUsers
);

module.exports = router;
