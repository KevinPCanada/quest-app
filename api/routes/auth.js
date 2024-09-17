import express from 'express';
import multer from 'multer';
// import { register, login, logout } from '../controllers/auth.js';
import { pool } from '../pool.js'; 

const router = express.Router()
const upload = multer()

// POST: Used to send data to the server to create a new resource or perform an action that changes the server’s state. For example, submitting a registration form or logging in.

// router.post('/register', upload.none(), register);
// router.post('/login', upload.none(), login);
// router.post('/logout', logout);

export default router