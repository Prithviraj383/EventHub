const express = require("express");
const eventController = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const validateMiddleware = require("../middleware/validateMiddleware");
const {
  createEventValidator,
  updateEventValidator,
} = require("../validators/eventValidator");

const router = express.Router();

router.get("/", eventController.listEvents);
router.get("/:id", eventController.getEvent);
router.get(
  "/:id/participants",
  authMiddleware,
  roleMiddleware("admin"),
  eventController.listEventParticipants
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createEventValidator,
  validateMiddleware,
  eventController.createEvent
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateEventValidator,
  validateMiddleware,
  eventController.updateEvent
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  eventController.deleteEvent
);

module.exports = router;
