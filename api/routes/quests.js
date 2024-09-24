import express from 'express';
import mysql from 'mysql2';
import multer from 'multer';
import { addQuest, deleteQuest, modifyQuest, displayAllQuests, getQuestByID, completeQuest, getCompletedQuests, getIncompleteQuests, getExpByQuest } from '../controllers/quests.js';

const app = express();
// const port = 8800;
const router = express.Router()

const upload = multer()


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

//add/delete a quest
router.post('/add-quest', upload.none(), addQuest)
router.delete('/delete-quest/:questId', deleteQuest)
//modify the name/description/level of a quest
router.put('/modify-quest', upload.none(), modifyQuest)
//display all of the quest of one user
router.get('/display-user/:userId', upload.none(), displayAllQuests)
//display a specific quest based on it's ID
router.get('/display-quest/:questId', upload.none(), getQuestByID)
//mark a quest as complete
router.put('/complete-quest/:questId', completeQuest)
//get a list of all of one user's completed quests
router.get('/completed/:userId', getCompletedQuests)
//get a list of all of one user's incomplete quests
router.get('/incomplete/:userId', getIncompleteQuests)
//get a quests's experience by the quest ID
router.get('/exp/:questId', getExpByQuest)





export default router