const Agent = require('../models/agent');

//@route to create an agent in database
exports.createAgent = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const userId = req.userId; // from auth middleware

    const newAgent = new Agent({ name, email, phone, password, userId });
    await newAgent.save();

    res.status(201).json({ message: 'Agent added successfully', agent: newAgent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//@route to get Agents for a user from database
exports.getAgents = async (req, res) => {
  try {
    const agents = await Agent.find({ userId: req.userId });
    res.json(agents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//@route to update the agent
exports.updateAgent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAgent = await Agent.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedAgent);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update agent' });
  }
};

//@route to delete the Agent
exports.deleteAgent = async (req, res) => {
  try {
    const { id } = req.params;
    await Agent.findByIdAndDelete(id);
    res.status(200).json({ message: 'Agent deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete agent' });
  }
};



