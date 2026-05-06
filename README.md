✅ Task Manager API — Full Project Setup (Professional README)

A secure and modular Task Manager REST API built with Node.js, Express, and PostgreSQL, featuring authentication, task workflows, status transitions, assignment logic, pagination, filters, JWT authorization, rate-limiting, and secure password hashing.

📌 Features Overview
🔐 Authentication

Register user with hashed password (PBKDF2 or bcrypt)

Login with JWT token

JWT middleware to protect routes (Bearer token)

Token expiry for security

Unique email + username validation

Secure password hashing (PBKDF2/bcryptjs)

📝 Tasks Module

Create tasks

Update tasks (status, due_date, description, assigned_to)

Filter tasks by:

status (?status=todo)

due date (?due_before=2025-02-01)

Pagination: ?limit=10&offset=0

Only creator or assignee can modify a task

Only creator can delete

Mark tasks as completed (PATCH /tasks/:id/complete)

Enforced status rules: only todo, in-progress, done

⚙️ Advanced Features

SQL input sanitization using parameterized queries

Rate limiting (to prevent abuse)

Swagger auto-generated API docs

Database seeding for demo users and tasks

Transactions for critical updates

Overdue task detection (due_date < NOW())

🗄️ Database Schema
Users Table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Tasks Table
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date TIMESTAMP,
  status VARCHAR(50) DEFAULT 'todo'
    CHECK (status IN ('todo', 'in-progress', 'done')),
  assigned_to INTEGER REFERENCES users(id),
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

🌱 Seed Data
3 Users (hashed passwords required)
INSERT INTO users (username, email, password_hash)
VALUES
  ('john_doe', 'john@example.com', '<HASHED_PASSWORD>'),
  ('mary_smith', 'mary@example.com', '<HASHED_PASSWORD>'),
  ('alex_dev', 'alex@example.com', '<HASHED_PASSWORD>');

10 Tasks

(Varied statuses, dates, and assignments)

INSERT INTO tasks (title, description, status, due_date, assigned_to, created_by)
VALUES
  ('Setup project', 'Initial project setup', 'done', NOW() - INTERVAL '1 day', 1, 1),
  ('Create DB schema', 'Define tables', 'in-progress', NOW() + INTERVAL '2 day', 2, 1),
  ('Implement login', 'JWT + hashing', 'todo', NOW() + INTERVAL '3 day', 1, 2),
  ('UI mockups', 'Design screens', 'todo', NOW() + INTERVAL '5 day', 3, 2),
  ('Bug fixes', 'Critical fixes', 'in-progress', NOW() + INTERVAL '1 day', 3, 1),
  ('Deploy API', 'Railway deployment', 'todo', NOW() + INTERVAL '4 day', 1, 3),
  ('Write tests', 'Unit and integration', 'todo', NOW() + INTERVAL '1 week', 2, 3),
  ('Docs', 'Write documentation', 'done', NOW() - INTERVAL '3 day', 2, 2),
  ('Improve validation', 'Add Joi', 'todo', NOW() + INTERVAL '2 week', 3, 1),
  ('Refactor controllers', 'Cleanup codebase', 'in-progress', NOW() + INTERVAL '6 day', 1, 2);

📂 Recommended Project Structure
src/
│── config/
│     └── db.js
│── middlewares/
│     └── auth.js
│── controllers/
│     ├── auth.controller.js
│     └── task.controller.js
│── services/
│     ├── auth.service.js
│     └── task.service.js
│── routes/
│     ├── auth.routes.js
│     └── task.routes.js
│── utils/
│     ├── crypto.js
│     ├── jwt.js
│     └── validate.js
│── seed/
│     └── seed.sql
│── app.js
│── server.js
package.json
.env
README.md

🔐 Password Hashing (Node crypto PBKDF2 Example)
import crypto from "crypto";

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 310000, 32, "sha256").toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password, storedHash) {
  const [salt, originalHash] = storedHash.split(":");
  const hash = crypto.pbkdf2Sync(password, salt, 310000, 32, "sha256").toString("hex");
  return hash === originalHash;
}

🔑 JWT Authentication Middleware
import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer "))
    return res.status(401).json({ message: "Missing or invalid token" });

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user_id = decoded.user_id;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

🔥 Core API Endpoints
AUTH (Public)
POST /register

Body:

{
  "username": "john",
  "email": "john@example.com",
  "password": "password123"
}


Returns:

{
  "token": "jwt_token_here"
}

POST /login

Body:

{
  "email": "john@example.com",
  "password": "password123"
}


Returns:

{
  "token": "jwt_token_here"
}

TASKS (Protected)
GET /tasks

Supports:

?status=todo

?due_before=2025-02-01

?limit=10&offset=0

POST /tasks

Body:

{
  "title": "Write documentation",
  "description": "Add details",
  "due_date": "2025-02-05",
  "assigned_to": 3
}

PATCH /tasks/:id/complete

Sets status to "done".

DELETE /tasks/:id

Only creator can delete.

🛡️ Security

✔ Parameterized SQL queries
✔ Password hashing (PBKDF2/bcrypt)
✔ JWT token with expiration
✔ Protected routes
✔ Rate limiter for sensitive endpoints

📘 Swagger Documentation

Available at:

/api-docs


(Using swagger-ui-express)

▶️ How to Run Locally
npm install
npm install jsonwebtoken bcryptjs pg express dotenv helmet express-rate-limit


Start server:

npm start

🧪 Test Checklist

Authentication:
✔ Register
✔ Login
✔ Invalid login
✔ Expired token
✔ Missing token

Tasks:
✔ Create
✔ Update
✔ Invalid status
✔ Unauthorized update
✔ Pagination
✔ Filters
✔ Overdue tasks
✔ Assignment rules

### How to clone  https://github.com/EbakocorneliusEmeh/taskmaneger-api.git