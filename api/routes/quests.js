import express from 'express';
// import multer from 'multer';
import mysql from 'mysql2';
import { addQuest, deleteQuest } from '../controllers/quests.js';

const app = express();
// const port = 8800;
const router = express.Router()


const db = mysql.createConnection({
  host: 'localhost', 
  user: 'root',      
  password: 'root', 
  database: 'questapp' 
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to the database');
});

// Define the route to get tasks for a specific user
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = `
    SELECT 
      tasks.task_name, 
      tasks.task_description, 
      difficulty.difficulty_name 
    FROM tasks
    JOIN difficulty ON tasks.task_level = difficulty.difficulty_level
    WHERE tasks.user_id = ?;
  `;
  
  // Execute the query
  db.query(query, [userId], (err, results) => {
    console.log('Query results:', results);
    res.json(results);
  });
});

router.post('/add-quest', addQuest)

export default router