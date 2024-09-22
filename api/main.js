import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import { pool } from './pool.js';

import authRoutes from './routes/auth.js';
import questRoutes from './routes/quests.js'
import rewardsRoutes from './routes/rewards.js'

const app = express();

// Middleware
app.use(cookieParser()); 
app.use(cors({
  origin: 'http://localhost:5173', // or whatever the frontend URL is
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Quest List API' });
});

app.use("/api/auth", authRoutes);
app.use('/api/quests', questRoutes);
app.use('/api/rewards', rewardsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const port = process.env.PORT  || 8800;
app.listen(port, () => {
  console.log('Server listening on http://localhost:8800');
});