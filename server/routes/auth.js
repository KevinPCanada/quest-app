import express from 'express';
import multer from 'multer';
import { register, login, logout, guestLogin } from '../controllers/auth.js';

const router = express.Router();
const upload = multer();

// Apply multer middleware (multer and upload.none() for form data)
router.post('/register', upload.none(), register);
router.post('/login', upload.none(), login);
router.post('/logout', logout);
router.post("/guest", guestLogin)

export default router;