import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors here, not in CommonJS style
import { connectDB } from './config/db.js';
import teacherRoutes from './routes/teacher.route.js';
import studentRoutes from './routes/student.route.js';
import loginRoutes from './routes/login.route.js';
import subjectRoutes from './routes/subject.route.js';
import requestRoutes from './routes/request.route.js';
import workRoutes from './routes/work.route.js';

dotenv.config();

// Initialize Database Connection
connectDB();

// Initialize Express Application
const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS for all routes

// Routes
app.use('/api/login', loginRoutes); // Adjusted endpoint path for login
app.use('/api/requests', requestRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/work', workRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/subjects', subjectRoutes);

// Start Server
app.listen(5000, () => {
    console.log('Server started at http://localhost:5000');
});
