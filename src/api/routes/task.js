


import express from 'express';
import auth from '../middleware/auth.js';

import CreateTask from '../controllers/tasks/CreateTask.js';
import GetAllTasks from '../controllers/tasks/GetAllTasks.js';
import GetSingleTask from '../controllers/tasks/GetSingleTask.js';
import UpdateTask from '../controllers/tasks/UpdateTask.js';
import DeleteTask from '../controllers/tasks/DeleteTask.js';

const router = express.Router();

router.use(auth);

router.route('/tasks')
  .post(CreateTask)
  .get(GetAllTasks);

router.route('/tasks/:id')
  .get(GetSingleTask)
  .patch(UpdateTask)
  .delete(DeleteTask);

export default router;
