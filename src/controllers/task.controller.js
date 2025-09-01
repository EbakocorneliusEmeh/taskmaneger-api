// task.controller.js
import { pool } from "../config/db.js";


export const getTasks = async (req, res) => {
  try {
    const tasksResult = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1",
      [req.user.id]
    );
    res.json({ status: "success", data: tasksResult.rows });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};


export const createTask = async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res
      .status(400)
      .json({ status: "error", message: "Title is required" });
  }

  try {
    const newTask = await pool.query(
      "INSERT INTO tasks (title, description, user_id, completed) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description || "", req.user.id, false]
    );
    res.status(201).json({ status: "success", data: newTask.rows[0] });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};


export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const result = await pool.query(
      "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [title, description || "", id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Task not found or not yours" });
    }

    res.json({ status: "success", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};


export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Task not found or not yours" });
    }

    res.json({ status: "success", message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};


export const markComplete = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "UPDATE tasks SET completed = true WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Task not found or not yours" });
    }

    res.json({ status: "success", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
