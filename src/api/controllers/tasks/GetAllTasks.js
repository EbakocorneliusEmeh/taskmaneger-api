import Task from '../../models/Task.js';

const GetAllTasks = async (req, res) => {
  const match = {};
  const sort = {};

  // Filtering: /tasks?completed=true
  if (req.query.completed) {
    match.completed = req.query.completed === 'true';
  }

  // Sorting: /tasks?sortBy=createdAt:asc
  if (req.query.sortBy) {
    const [field, order] = req.query.sortBy.split(':');

    sort[field] = order.toLowerCase() === 'desc' ? -1 : 1;
  }

  try {
    const tasks = await Task.find(
      { owner: req.user._id, ...match },
      null,
      {
        limit: parseInt(req.query.limit) || undefined,
        skip: parseInt(req.query.skip) || undefined,
        sort: Object.keys(sort).length ? sort : undefined
      }
    );

    res.status(200).json({
      status: 'success',
      tasks
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: error.message
    });
  }
};

export default GetAllTasks;
