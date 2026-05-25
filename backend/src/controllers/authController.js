const bcrypt = require("bcrypt");
const asyncHandler = require("../utils/asyncHandler");
const generateToken = require("../utils/generateToken");
const authService = require("../services/authService");

const buildCookieOptions = () => {
  const maxAge = Number(process.env.COOKIE_MAX_AGE || 86400000);
  return {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === "true",
    sameSite: process.env.COOKIE_SAMESITE || "lax",
    maxAge,
  };
};

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await authService.findUserByEmail(email);
  if (existingUser) {
    return res.status(409).json({
      message: "Email is already registered",
    });
  }

  const user = await authService.createUser({ name, email, password });
  const token = generateToken({ id: user.id, role: user.role });

  res.cookie(process.env.COOKIE_NAME || "eventhub_token", token, buildCookieOptions());

  res.status(201).json({
    message: "Registration successful",
    data: { user, token },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken({ id: user.id, role: user.role });

  res.cookie(process.env.COOKIE_NAME || "eventhub_token", token, buildCookieOptions());

  res.status(200).json({
    message: "Login successful",
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    },
  });
});

module.exports = {
  register,
  login,
};
