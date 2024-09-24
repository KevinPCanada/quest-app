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


// Define the route to get tasks for a specific user

//add a quest. 
//example query POST http://localhost:8800/api/quests/add-quest
//body questName: Shopping questDescription: Grocery shopping questLevel: 1
router.post('/add-quest', upload.none(), addQuest)

//delete a quest
//example query DELETE http://localhost:8800/api/quests/delete-quest/2
router.delete('/delete-quest/:questId', deleteQuest)

//modify the name/description/level of a quest
//example quest PUT http://localhost:8800/api/quests/modify-quest
//body questName: Shopping questDescription: Grocery shopping questLevel: 1 questId: 6
router.put('/modify-quest', upload.none(), modifyQuest)

//display all of the quest of one user
// example query GET http://localhost:8800/api/quests/display-user/2
router.get('/display-user/:userId', upload.none(), displayAllQuests)

//display a specific quest based on it's ID
//example query GET http://localhost:8800/api/quests/display-quest/4
router.get('/display-quest/:questId', upload.none(), getQuestByID)

//mark a quest as complete
// example query PUT http://localhost:8800/api/quests/complete-quest/3
router.put('/complete-quest/:questId', completeQuest)

//get a list of all of one user's completed quests
//example query GET http://localhost:8800/api/quests/completed/2
router.get('/completed/:userId', getCompletedQuests)

//get a list of all of one user's incomplete quests
//example query GET http://localhost:8800/api/quests/incomplete/2
router.get('/incomplete/:userId', getIncompleteQuests)

//get a quests's experience by the quest ID
//example query GET http://localhost:8800/api/quests/exp/7
router.get('/exp/:questId', getExpByQuest)



export default router