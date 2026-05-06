import Task from '../../models/Task.js';

const GetSingleTask = async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({
      _id,
      owner: req.user._id
    });

    if (!task) {
      return res.status(404).json({
        status: 'fail',
        error: 'Task not found'
      });
    }

    res.status(200).json({
      status: 'success',
      task
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: error.message
    });
  }
};

export default GetSingleTask;
