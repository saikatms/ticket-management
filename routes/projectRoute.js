const express = require("express");
const router = express.Router();
const projectController = require("../controller/projectController");
const schemaValidator = require("./../middleware/SchemaValidator");

const requireAuth = require("../middleware/checkAuth");
const requireRole = require("../middleware/checkRole");
router.post(
  "/",
  schemaValidator.projectValidation,
  requireAuth,
  requireRole(["admin", "project-admin"]),
  projectController.createProject
);

router.get("/", requireAuth, projectController.getProjects);
router.get("/:projectId", requireAuth, projectController.getProject);

router.put(
  "/:projectId",
  schemaValidator.updateProjectValidation,
  requireAuth,
  requireRole(["admin", "project-admin"]),
  projectController.updateProject
);

router.patch(
  "/addMembers/:projectId",
  schemaValidator.updateProjectValidation,
  requireAuth,
  requireRole(["admin", "project-admin"]),
  projectController.addMembers
);

module.exports = router;
