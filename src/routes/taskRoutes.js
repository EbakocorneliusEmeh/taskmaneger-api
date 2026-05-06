// task.routes.js
import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  markComplete,
} from "../controllers/task.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getTasks);
router.post("/", authMiddleware, createTask);       
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);
router.patch("/:id/complete", authMiddleware, markComplete);

export default router;
