// server.js
const express = require('express');
const cors = require('cors');
const conn = require('./utilise/conn');
const authRoutes = require('./routes/auth');
const agentRoutes = require('./routes/agentRoutes');
const taskRoutes = require('./routes/taskRoutes');

// App config
const app = express();


//  Connect to DB at startup
conn();
app.use(cors());
app.use(express.json());

//  route 
app.use('/api', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/tasks', taskRoutes); 




const PORT = 5000;
// Start server
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});






