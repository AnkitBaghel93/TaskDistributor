const Task = require('../models/task');

//@route to upload tasks in database
exports.uploadTasks = async (req, res) => {
  try {
    const { tasks } = req.body; // tasks: [{ firstName, phone, notes, agentId }]
    const userId = req.userId;

    if (!tasks || !Array.isArray(tasks)) {
      return res.status(400).json({ message: 'Invalid or missing tasks array.' });
    }

    const taskDocs = tasks.map(task => ({
      ...task,
      userId,
    }));

    await Task.insertMany(taskDocs);
    res.status(201).json({ message: 'Tasks uploaded and assigned successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
    

//@route to get all tasks assigned to user
exports.getTasksByUser = async (req, res) => {
  try {
    const userId = req.userId;
    const tasks = await Task.find({ userId }).populate('agentId', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




