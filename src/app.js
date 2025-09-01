// import express from "express";
// import authRoutes from "./routes/authRoutes.js";
// import taskRoutes from "./routes/taskRoutes.js";

// const app = express();

// app.use(express.json());

// // Routes
// app.use("/auth", authRoutes);   // handles /auth/register, /auth/login
// app.use("/tasks", taskRoutes);  // handles /tasks/...

// // Catch-all for unknown routes
// app.use((req, res) => {
//   res.status(404).json({ status: "error", message: "Route not found" });
// });

// export default app;




import express from "express";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ status: "error", message: "Route not found" });
});

export default app;
