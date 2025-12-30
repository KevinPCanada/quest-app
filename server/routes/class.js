import express from 'express';
import { getAllClasses, getClassInfo } from '../controllers/class.js';

const router = express.Router();

router.get('/', getAllClasses);
router.get('/:id', getClassInfo);

export default router;