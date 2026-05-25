const pool = require("../config/db");

const listEvents = async () => {
  const result = await pool.query(
    "SELECT id, title, description, venue, event_date, max_participants, created_by, created_at FROM events ORDER BY event_date ASC"
  );
  return result.rows;
};

const getEventById = async (id) => {
  const result = await pool.query(
    "SELECT id, title, description, venue, event_date, max_participants, created_by, created_at FROM events WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

const createEvent = async (payload) => {
  const { title, description, venue, event_date, max_participants, created_by } =
    payload;
  const result = await pool.query(
    "INSERT INTO events (title, description, venue, event_date, max_participants, created_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, title, description, venue, event_date, max_participants, created_by, created_at",
    [title, description, venue, event_date, max_participants, created_by]
  );
  return result.rows[0];
};

const updateEvent = async (id, payload) => {
  const { title, description, venue, event_date, max_participants } = payload;
  const result = await pool.query(
    "UPDATE events SET title = COALESCE($1, title), description = COALESCE($2, description), venue = COALESCE($3, venue), event_date = COALESCE($4, event_date), max_participants = COALESCE($5, max_participants) WHERE id = $6 RETURNING id, title, description, venue, event_date, max_participants, created_by, created_at",
    [title, description, venue, event_date, max_participants, id]
  );
  return result.rows[0];
};

const deleteEvent = async (id) => {
  const result = await pool.query(
    "DELETE FROM events WHERE id = $1 RETURNING id",
    [id]
  );
  return result.rows[0];
};

const listEventParticipants = async (eventId) => {
  const result = await pool.query(
    "SELECT u.id, u.name, u.email, r.status, r.registered_at FROM registrations r JOIN users u ON r.user_id = u.id WHERE r.event_id = $1 ORDER BY r.registered_at ASC",
    [eventId]
  );
  return result.rows;
};

module.exports = {
  listEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  listEventParticipants,
};
