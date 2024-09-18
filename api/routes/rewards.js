import express from 'express';
import multer from 'multer';
import { 
    createReward, 
    getUserRewards, 
    updateReward, 
    claimReward, 
    deleteReward 
} from '../controllers/rewards.js';

const router = express.Router();
const upload = multer();

// Create
router.post('/', upload.none(), createReward);

// Get all
router.get('/user/:userId', getUserRewards);

// Get single
router.get('/:rewardId', getReward);

// Update
router.put('/:rewardId', upload.none(), updateReward);

// Claim
router.post('/:rewardId/claim', claimReward);

// Delete
router.delete('/:rewardId', deleteReward);

export default router;
