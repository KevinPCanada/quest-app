import express from "express";
import multer from "multer";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  getUserExp,
  getUser,
  getUserMilestone,
  updateUserMilestone,
  getUserClassInfo,
  updateUserDisplayName,
  updateUserClass,
} from "../controllers/user.js";

const router = express.Router();
const upload = multer();

// Route to get user info
router.get("/:id", verifyToken, getUser);

// Route to get user experience by ID
router.get("/:id/exp", verifyToken, getUserExp);

// get user muilestone
router.get("/:id/milestone", verifyToken, getUserMilestone);

// update user display name
router.put("/:id/display-name", verifyToken, upload.none(), updateUserDisplayName);

// Update user muilestone
router.put("/:id/milestone", verifyToken, upload.none(), updateUserMilestone);

// Class-related routes

// Get user class
router.get('/:id/class', verifyToken, getUserClassInfo);

// Update User Class
router.put("/:id/class", verifyToken, upload.none(), updateUserClass);

export default router;
