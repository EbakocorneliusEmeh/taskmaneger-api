// const express = require('express');
// const auth = require('../middleware/auth');

// const CreateTask = require('../controllers/tasks/CreateTask');
// const GetAllTasks = require('../controllers/tasks/GetAllTasks');
// const GetSingleTask = require('../controllers/tasks/GetSingleTask');
// const UpdateTask = require('../controllers/tasks/UpdateTask');
// const DeleteTask = require('../controllers/tasks/DeleteTask');

// const router = express.Router();

// router.use(auth);

// router.route('/tasks').post(CreateTask).get(GetAllTasks);



// router
// 	.route('/tasks/:id')
// 	.get(GetSingleTask)
// 	.patch(UpdateTask)
// 	.delete(DeleteTask);

// module.exports = router;




import express from 'express';
import auth from '../middleware/auth.js';

/*
 ** import controllers
 */
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
