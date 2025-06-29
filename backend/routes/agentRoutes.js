const express = require('express');
const { createAgent, getAgents , updateAgent, deleteAgent} = require('../controllers/agentController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authenticate, createAgent);
router.get('/:userId', authenticate, getAgents);

// PUT to update agent
router.put('/:id', authenticate, updateAgent);

// DELETE to delete agent
router.delete('/:id', authenticate, deleteAgent);


module.exports = router;
