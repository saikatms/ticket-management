const express = require("express");
const router = express.Router();
const auth = require("../controller/authController");
const schemaValidator = require("./../middleware/SchemaValidator");
router.post("/signUp", schemaValidator.userValidation, auth.signUp);
router.get("/signIn", auth.signIn);

module.exports = router;
