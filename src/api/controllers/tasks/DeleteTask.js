import Task from '../../models/Task.js';

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!task) {
      return res.status(404).json({
        status: 'fail',
        message: 'Task not found'
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Task deleted successfully',
      task
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Server error',
      error: error.message
    });
  }
};

export default deleteTask;
