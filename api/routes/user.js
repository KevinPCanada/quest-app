import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { getUserExp, getUser } from '../controllers/user.js';

const router = express.Router();

// Route to get user info
router.get('/:id', verifyToken, getUser);


// Route to get user experience by ID
router.get('/:id/exp', verifyToken, getUserExp);

export default router;