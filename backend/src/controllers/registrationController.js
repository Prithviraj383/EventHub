const asyncHandler = require("../utils/asyncHandler");
const registrationService = require("../services/registrationService");

const registerForEvent = asyncHandler(async (req, res) => {
  const registration = await registrationService.createRegistration(
    req.user.id,
    req.params.eventId
  );

  res.status(201).json({
    message: "Registered for event successfully",
    data: registration,
  });
});

const cancelRegistration = asyncHandler(async (req, res) => {
  const deleted = await registrationService.deleteRegistration(
    req.user.id,
    req.params.eventId
  );
  if (!deleted) {
    return res.status(404).json({ message: "Registration not found" });
  }

  res.status(200).json({
    message: "Registration cancelled successfully",
  });
});

const listMyRegistrations = asyncHandler(async (req, res) => {
  const registrations = await registrationService.listUserRegistrations(req.user.id);

  res.status(200).json({
    message: "Registrations fetched successfully",
    data: registrations,
  });
});

module.exports = {
  registerForEvent,
  cancelRegistration,
  listMyRegistrations,
};
