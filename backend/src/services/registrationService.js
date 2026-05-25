const pool = require("../config/db");

const createRegistration = async (userId, eventId) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const eventResult = await client.query(
      "SELECT id, max_participants FROM events WHERE id = $1 FOR UPDATE",
      [eventId]
    );
    const event = eventResult.rows[0];
    if (!event) {
      const notFoundError = new Error("Event not found");
      notFoundError.statusCode = 404;
      throw notFoundError;
    }

    const existing = await client.query(
      "SELECT id FROM registrations WHERE user_id = $1 AND event_id = $2",
      [userId, eventId]
    );
    if (existing.rows.length > 0) {
      const duplicateError = new Error("Already registered for this event");
      duplicateError.statusCode = 409;
      throw duplicateError;
    }

    const countResult = await client.query(
      "SELECT COUNT(*)::int AS total FROM registrations WHERE event_id = $1",
      [eventId]
    );
    const total = countResult.rows[0].total;
    if (total >= event.max_participants) {
      const fullError = new Error("Event registration is full");
      fullError.statusCode = 409;
      throw fullError;
    }

    const insertResult = await client.query(
      "INSERT INTO registrations (user_id, event_id, status) VALUES ($1, $2, $3) RETURNING id, user_id, event_id, status, registered_at",
      [userId, eventId, "registered"]
    );

    await client.query("COMMIT");
    return insertResult.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const deleteRegistration = async (userId, eventId) => {
  const result = await pool.query(
    "DELETE FROM registrations WHERE user_id = $1 AND event_id = $2 RETURNING id, user_id, event_id",
    [userId, eventId]
  );
  return result.rows[0];
};

const listUserRegistrations = async (userId) => {
  const result = await pool.query(
    "SELECT r.id, r.status, r.registered_at, e.id AS event_id, e.title, e.event_date, e.venue FROM registrations r JOIN events e ON r.event_id = e.id WHERE r.user_id = $1 ORDER BY e.event_date ASC",
    [userId]
  );
  return result.rows;
};

module.exports = {
  createRegistration,
  deleteRegistration,
  listUserRegistrations,
};
