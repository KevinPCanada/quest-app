import express from 'express';
import multer from 'multer';
import { verifyToken } from '../middleware/authMiddleware.js';
import { getUserExp, getUser, getUserMilestone, updateUserMilestone } from '../controllers/user.js';

const router = express.Router();
const upload = multer();

// Route to get user info
router.get('/:id', verifyToken, getUser);


// Route to get user experience by ID
router.get('/:id/exp', verifyToken, getUserExp);

// get user muilestone
router.get('/:id/milestone', verifyToken, getUserMilestone);

// Update user muilestone
router.put('/:id/milestone', verifyToken, upload.none(), updateUserMilestone);

export default router;