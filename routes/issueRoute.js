const express = require("express");
const router = express.Router();
const issueController = require("../controller/issueController");
const schemaValidator = require("./../middleware/SchemaValidator");

const requireAuth = require("../middleware/checkAuth");
const requireRole = require("../middleware/checkRole");
// router.post(
//   "/",
//   schemaValidator.projectValidation,
//   requireAuth,
//   requireRole(["admin", "project-admin"]),
//   projectController.createProject
// );

router.get("/", requireAuth, issueController.getIssueByCurrentUser);
router.get(
  "/getIssues/:projectId",
  requireAuth,
  issueController.getIssueByProject
);

router.get(
  "/getUserIssues/:userId",
  requireAuth,
  issueController.getUserIssues
);

router.get("/getIssue/:issueId", requireAuth, issueController.getIssueById);

router.post(
  "/createIssue/:projectId",
  schemaValidator.projectValidation,
  requireAuth,
  issueController.createIssue
);

router.put("/editIssue/:issueId", requireAuth, issueController.editIssue);
module.exports = router;
