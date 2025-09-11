
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({ status: "welcome", message: "welcome" });
});

export default app;
