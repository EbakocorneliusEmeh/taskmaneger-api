import Task from '../../models/Task.js';

const createTask = async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      owner: req.user._id
    });
    await task.save();
    res.status(201).json({ status: 'success', task });
  } catch (error) {
    res.status(400).json({ status: 'fail', error });
  }
};

export default createTask;
