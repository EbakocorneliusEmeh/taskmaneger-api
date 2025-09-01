import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 8080,
  jwtSecret: process.env.JWT_SECRET || "supersecretkey",
  db: {
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || "task_manager",
  },
};

export default config;
