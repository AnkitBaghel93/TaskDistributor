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
const allowedOrigins = ['https://taskdistributor-frontend.onrender.com'];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin like mobile apps or curl
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

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






