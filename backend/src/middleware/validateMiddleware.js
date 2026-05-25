const { validationResult } = require("express-validator");

const validateMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  return next();
};

module.exports = validateMiddleware;
