const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  firstName: String,
  phone: String,
  notes: String,
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', taskSchema);
