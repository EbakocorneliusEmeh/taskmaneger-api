import express from 'express';

import userRouter from './api/routes/user.js';
import taskRouter from './api/routes/task.js';

export const app = express();

app.use(express.json());

// ROUTES
app.use(userRouter);
app.use(taskRouter);

export default app;
