const { body } = require("express-validator");

const createEventValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").optional().trim(),
  body("venue").trim().notEmpty().withMessage("Venue is required"),
  body("event_date")
    .isISO8601()
    .withMessage("Event date must be a valid ISO date"),
  body("max_participants")
    .isInt({ min: 1 })
    .withMessage("Max participants must be at least 1"),
];

const updateEventValidator = [
  body("title").optional().trim().notEmpty().withMessage("Title is required"),
  body("description").optional().trim(),
  body("venue").optional().trim().notEmpty().withMessage("Venue is required"),
  body("event_date")
    .optional()
    .isISO8601()
    .withMessage("Event date must be a valid ISO date"),
  body("max_participants")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Max participants must be at least 1"),
];

module.exports = {
  createEventValidator,
  updateEventValidator,
};
