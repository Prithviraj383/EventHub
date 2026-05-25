const express = require("express");
const authController = require("../controllers/authController");
const validateMiddleware = require("../middleware/validateMiddleware");
const { registerValidator, loginValidator } = require("../validators/authValidator");

const router = express.Router();

router.post("/register", registerValidator, validateMiddleware, authController.register);
router.post("/login", loginValidator, validateMiddleware, authController.login);

module.exports = router;
