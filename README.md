A full-stack MERN application that allows an admin to:

- Sign in and create agent accounts
- Upload a list of tasks via CSV
- Automatically distribute tasks among agents
- View and manage agents and their assigned tasks on a dashboard

Live Demo
**Frontend**: https://your-frontend-app.onrender.com

**Backend API**:https://your-backend-api.onrender.com


├── backend

│   ├── models/

│   ├── routes/

│   ├── controllers/

│   ├── server.js

│   └── .env

└── frontend

    ├── src/
    
    ├── public/
    
    ├── package.json
    
    └── tailwind.config.js


For Frontend

cd frontend

npm install

npm start


For Backend

cd backend

npm install


.env file

PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

allowedOrigins=https://your-frontend-app.onrender.com

npm start

must install libraries 

Frontend

React.js

React Router

Tailwind CSS

React Toastify

PapaParse (for CSV parsing)

Axios or fetch API

Backend

Express.js

Mongoose

dotenv

jsonwebtoken

bcryptjs

cors

body-parser
