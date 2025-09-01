
import { pool } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";


export const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ status: "error", message: "Missing fields" });
  }

  const existingUser = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
  if (existingUser.rows.length > 0) {
    return res.status(409).json({ status: "error", message: "Email already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
    [name, email, hashedPassword]
  );

  const user = newUser.rows[0];

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  res.status(201).json({ status: "success", data: { user, token } });
};


export const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ status: "error", message: "Missing fields" });
  }

  const userResult = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
  const user = userResult.rows[0];

  if (!user) {
    return res.status(401).json({ status: "error", message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ status: "error", message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  res.json({ status: "success", data: { token } });
};
