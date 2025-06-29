const express = require('express');
const router = express.Router();
const { uploadTasks, getTasksByUser } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/upload', authMiddleware, uploadTasks);
router.get('/user', authMiddleware, getTasksByUser);

module.exports = router;
