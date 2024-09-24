import express from 'express';
import mysql from 'mysql2';
import { addQuest, deleteQuest, modifyQuest, displayAllQuests, getQuestByID, completeQuest } from '../controllers/quests.js';

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

router.post('/add-quest', addQuest)
router.delete('/delete-quest/:id', deleteQuest)
router.put('/modify-quest', modifyQuest)
router.get('/display-user/:userId', displayAllQuests)
router.get('/display-quest/:questID', getQuestByID)
router.put('/complete-quest/:questID', completeQuest)



export default router