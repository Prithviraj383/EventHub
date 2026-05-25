const express = require("express");
const registrationController = require("../controllers/registrationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:eventId", authMiddleware, registrationController.registerForEvent);
router.delete("/:eventId", authMiddleware, registrationController.cancelRegistration);
router.get("/my-events", authMiddleware, registrationController.listMyRegistrations);

module.exports = router;
