import pool from "../config/db.js";

export async function createTask(ownerId, title, description) {
  const result = await pool.query(
    "INSERT INTO tasks (title, description, owner_id) VALUES ($1,$2,$3) RETURNING *",
    [title, description, ownerId]
  );
  return result.rows[0];
}

export async function listTasks(ownerId) {
  const result = await pool.query(
    "SELECT * FROM tasks WHERE owner_id=$1 ORDER BY created_at DESC",
    [ownerId]
  );
  return result.rows;
}

export async function getTask(ownerId, taskId) {
  const result = await pool.query(
    "SELECT * FROM tasks WHERE id=$1 AND owner_id=$2",
    [taskId, ownerId]
  );
  return result.rows[0];
}

export async function updateTask(ownerId, taskId, fields) {
  const columns = [];
  const values = [];
  let i = 1;
  for (const key in fields) {
    columns.push(`${key}=$${i}`);
    values.push(fields[key]);
    i++;
  }
  values.push(taskId, ownerId);
  const query = `UPDATE tasks SET ${columns.join(", ")} WHERE id=$${i} AND owner_id=$${i+1} RETURNING *`;
  const result = await pool.query(query, values);
  return result.rows[0];
}

export async function deleteTask(ownerId, taskId) {
  const result = await pool.query(
    "DELETE FROM tasks WHERE id=$1 AND owner_id=$2 RETURNING *",
    [taskId, ownerId]
  );
  return result.rows[0];
}

export async function markTaskStatus(ownerId, taskId, status) {
  const result = await pool.query(
    "UPDATE tasks SET status=$1 WHERE id=$2 AND owner_id=$3 RETURNING *",
    [status, taskId, ownerId]
  );
  return result.rows[0];
}
