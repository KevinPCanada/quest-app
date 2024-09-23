// rewards.js (in the routes folder)
import express from 'express';
import multer from 'multer';
import { verifyToken } from '../middleware/authMiddleware.js';
import { addReward, getRewards, claimReward, editReward, getReward, deleteReward} from '../controllers/rewards.js';

const router = express.Router();
const upload = multer();

// Protected route - Only accessible if a valid token is provided
router.post('/add', verifyToken, addReward);
router.get('/:id', verifyToken, getReward);
router.get('/', verifyToken, getRewards);
router.put('/claim/:id', verifyToken, claimReward);
router.put('/edit/:id', verifyToken, upload.none(), editReward);
router.delete('/:id', verifyToken, deleteReward);

export default router;