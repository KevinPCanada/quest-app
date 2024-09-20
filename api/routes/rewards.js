// rewards.js (in the routes folder)
import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { addReward, getRewards, claimReward } from '../controllers/rewards.js';

const router = express.Router();

// Protected route - Only accessible if a valid token is provided
router.post('/add', verifyToken, addReward);
router.get('/', verifyToken, getRewards);
router.put('/claim/:id', verifyToken, claimReward);

export default router;