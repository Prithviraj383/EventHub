const asyncHandler = require("../utils/asyncHandler");
const eventService = require("../services/eventService");

const listEvents = asyncHandler(async (req, res) => {
  const events = await eventService.listEvents();
  res.status(200).json({
    message: "Events fetched successfully",
    data: events,
  });
});

const getEvent = asyncHandler(async (req, res) => {
  const event = await eventService.getEventById(req.params.id);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  res.status(200).json({
    message: "Event fetched successfully",
    data: event,
  });
});

const createEvent = asyncHandler(async (req, res) => {
  const payload = {
    ...req.body,
    created_by: req.user.id,
  };
  const event = await eventService.createEvent(payload);
  res.status(201).json({
    message: "Event created successfully",
    data: event,
  });
});

const updateEvent = asyncHandler(async (req, res) => {
  const updated = await eventService.updateEvent(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ message: "Event not found" });
  }

  res.status(200).json({
    message: "Event updated successfully",
    data: updated,
  });
});

const deleteEvent = asyncHandler(async (req, res) => {
  const deleted = await eventService.deleteEvent(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: "Event not found" });
  }

  res.status(200).json({
    message: "Event deleted successfully",
  });
});

const listEventParticipants = asyncHandler(async (req, res) => {
  const event = await eventService.getEventById(req.params.id);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  const participants = await eventService.listEventParticipants(req.params.id);

  res.status(200).json({
    message: "Participants fetched successfully",
    data: participants,
  });
});

module.exports = {
  listEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  listEventParticipants,
};
