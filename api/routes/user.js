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
  updateUserExpLevel,
  getMilestoneProgress,
  updateMilestoneProgress,
  checkMilestone,
  deleteUser,
} from "../controllers/user.js";

const router = express.Router();
const upload = multer();

// Route to get user info
router.get("/:id", verifyToken, getUser);

// get user muilestone
router.get("/:id/milestone", verifyToken, getUserMilestone);

// update user display name
router.put("/:id/display-name", verifyToken, upload.none(), updateUserDisplayName);

// Milestone stuff

// get user's milestone progress
router.get('/:id/milestone-progress', verifyToken, getMilestoneProgress);

// Update their milestone-proress
router.put('/:id/milestone-progress', verifyToken, updateMilestoneProgress);

// Check if a milestone has been reached
router.get('/:id/check-milestone', verifyToken, checkMilestone);

// Update user milestone
router.put("/:id/milestone", verifyToken, upload.none(), updateUserMilestone);

// CLASS-related routes

// Get user class
router.get('/:id/class', verifyToken, getUserClassInfo);

// Update User Class
router.put("/:id/class", verifyToken, upload.none(), updateUserClass);

// EXP/Level stuff

// Route to get user experience by ID
router.get("/:id/exp", verifyToken, getUserExp);

// Route to UPDATE user experience and Level
router.put("/:id/explvlupdate", verifyToken, updateUserExpLevel);


//Route to delete the user from the users table
router.delete("/:id/delete", deleteUser)


export default router;
