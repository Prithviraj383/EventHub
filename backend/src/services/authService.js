const bcrypt = require("bcrypt");
const pool = require("../config/db");

const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT id, name, email, password, role FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0];
};

const createUser = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created_at",
    [name, email, hashedPassword, "user"]
  );
  return result.rows[0];
};

module.exports = {
  findUserByEmail,
  createUser,
};
