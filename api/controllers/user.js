import { pool } from "../pool.js";
import { 
  calculateLevel, 
  hasLeveledUp, 
  experienceToNextLevel, 
  levelProgress 
} from '../utils/levelCalculations.js';
import { 
  calculateNewMilestoneProgress, 
  isMilestoneReached, 
  calculateRemainingProgress 
} from '../utils/milestoneUtils.js';

export const getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const [user] = await pool.query("SELECT * FROM users WHERE user_id = ?", [
      userId,
    ]);

    // Verify that the requesting user is the same as the user being queried
    if (req.user.id != userId) {
      return res.status(403).json({
        message: "You don't have permission to access this information",
      });
    }

    if (user.length === 0) {
      return res.status(404).json({
        message: "User not found or you don't have permission to view it",
      });
    }

    const { password_hash, ...userWithoutPassword } = user[0];

    // Calculate the level
    userWithoutPassword.level = calculateLevel(userWithoutPassword.experience);

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the user" });
  }
};

export const getUserExp = async (req, res) => {
  try {
    const userId = req.params.id;

    if (req.user.id != userId) {
      return res.status(403).json({
        message: "You don't have permission to access this information",
      });
    }

    const [rows] = await pool.query(
      "SELECT experience FROM users WHERE user_id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const experience = rows[0].experience;
    const level = calculateLevel(experience);

    res.status(200).json({ 
      experience, 
      level,
      experienceToNextLevel: experienceToNextLevel(experience),
      levelProgress: levelProgress(experience)
    });
  } catch (error) {
    console.error("Error fetching user experience:", error);
    res.status(500).json({ message: "An error occurred while fetching user experience" });
  }
};


export const updateUserExpLevel = async (req, res) => {
  try {
    const userId = req.params.id;
    const { experienceGained } = req.body;

    if (req.user.id != userId) {
      console.log(`Authentication failed: ${req.user.id} != ${userId}`);
      return res.status(403).json({
        message: "You don't have permission to update this information",
      });
    }

    // Fetch current user data
    const [user] = await pool.query(
      "SELECT experience, level, milestone, milestone_progress FROM users WHERE user_id = ?",
      [userId]
    );

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const { experience: currentExperience, level: currentLevel, milestone, milestone_progress: currentMilestoneProgress } = user[0];

    // Calculate new experience and level
    const newExperience = currentExperience + experienceGained;
    const newLevel = calculateLevel(newExperience);

    // Check if user leveled up
    const leveledUp = hasLeveledUp(currentExperience, newExperience);
    const levelsGained = newLevel - currentLevel;

    // Calculate new milestone progress
    let newMilestoneProgress = currentMilestoneProgress;
    let milestoneReached = false;

    for (let i = 0; i < levelsGained; i++) {
      newMilestoneProgress = calculateNewMilestoneProgress(newMilestoneProgress, milestone, true);
      if (isMilestoneReached(newMilestoneProgress, true)) {
        milestoneReached = true;
        // If a milestone is reached, we keep the progress at 0
        newMilestoneProgress = 0;
      }
    }

    // Update user in database
    const updateResult = await pool.query(
      "UPDATE users SET experience = ?, level = ?, milestone_progress = ? WHERE user_id = ?",
      [newExperience, newLevel, newMilestoneProgress, userId]
    );

    res.status(200).json({
      message: "Experience and level updated successfully",
      newExperience,
      newLevel,
      levelsGained,
      milestoneReached,
      newMilestoneProgress,
      remainingProgress: calculateRemainingProgress(newMilestoneProgress, milestone),
      experienceToNextLevel: experienceToNextLevel(newExperience),
      levelProgress: levelProgress(newExperience)
    });

  } catch (error) {
    console.error("Error updating user experience and level:", error);
    res.status(500).json({ message: "An error occurred while updating user experience and level" });
  }
};


// Milestone stuff

export const getUserMilestone = async (req, res) => {
  try {
    const userId = req.params.id;

    // Verify that the requesting user is the same as the user being queried
    if (req.user.id != userId) {
      return res.status(403).json({
        message: "You don't have permission to access this information",
      });
    }

    // Fetch the milestone directly from the database
    const [rows] = await pool.query(
      "SELECT milestone FROM users WHERE user_id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the milestone
    res.status(200).json({ milestone: rows[0].milestone });
  } catch (error) {
    console.error("Error fetching user milestone:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching user milestone" });
  }
};

export const updateUserMilestone = async (req, res) => {
  try {
    const userId = req.params.id;
    const { milestone } = req.body;

    // Verify that the requesting user is the same as the user being updated
    if (req.user.id != userId) {
      return res.status(403).json({
        message: "You don't have permission to update this information",
      });
    }

    // Validate the milestone value
    if (!["1", "2", "5", "10"].includes(milestone)) {
      return res
        .status(400)
        .json({ message: "Invalid milestone value. Must be 1, 2, 5, or 10." });
    }

    // Update the milestone in the database
    const [result] = await pool.query(
      "UPDATE users SET milestone = ? WHERE user_id = ?",
      [milestone, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return success message
    res
      .status(200)
      .json({ message: "Milestone updated successfully", milestone });
  } catch (error) {
    console.error("Error updating user milestone:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating user milestone" });
  }
};

export const getMilestoneProgress = async (req, res) => {
  try {
    const userId = req.params.id;

    if (req.user.id != userId) {
      return res.status(403).json({
        message: "You don't have permission to access this information",
      });
    }

    const [rows] = await pool.query('SELECT milestone, milestone_progress FROM users WHERE user_id = ?', [userId]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const { milestone, milestone_progress } = rows[0];

    res.status(200).json({
      milestone,
      milestone_progress,
      remainingProgress: calculateRemainingProgress(milestone_progress, milestone)
    });
  } catch (error) {
    console.error("Error fetching milestone progress:", error);
    res.status(500).json({ message: "Error fetching milestone progress", error: error.message });
  }
};

export const updateMilestoneProgress = async (req, res) => {
  try {
    const userId = req.params.id;
    const { newProgress } = req.body;

    // Validate newProgress
    if (typeof newProgress !== 'number' || newProgress < 0) {
      return res.status(400).json({ message: "Invalid progress value" });
    }

    // Fetch the user's current milestone
    const [user] = await pool.query(
      "SELECT milestone FROM users WHERE user_id = ?",
      [userId]
    );

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const { milestone } = user[0];

    // Ensure newProgress is always less than milestone
    const validatedProgress = newProgress % milestone;

    // Update the milestone progress in the database
    await pool.query(
      "UPDATE users SET milestone_progress = ? WHERE user_id = ?",
      [validatedProgress, userId]
    );

    res.json({ 
      message: "Milestone progress updated successfully", 
      newProgress: validatedProgress,
      milestoneReached: validatedProgress === 0
    });
  } catch (error) {
    console.error("Error updating milestone progress:", error);
    res.status(500).json({ message: "Error updating milestone progress" });
  }
};

export const checkMilestone = async (req, res) => {
  try {
    const userId = req.params.id;

    if (req.user.id != userId) {
      return res.status(403).json({
        message: "You don't have permission to access this information",
      });
    }

    const [rows] = await pool.query('SELECT milestone, milestone_progress, level FROM users WHERE user_id = ?', [userId]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const { milestone, milestone_progress, level } = rows[0];
    
    console.log(`User ${userId}: milestone=${milestone}, progress=${milestone_progress}, level=${level}`);

    const milestoneReached = milestone_progress === 0;

    res.json({ 
      milestoneReached,
      level,
      currentProgress: milestone_progress, 
      milestone,
      remainingProgress: calculateRemainingProgress(milestone_progress, milestone)
    });
  } catch (error) {
    console.error("Error checking milestone:", error);
    res.status(500).json({ message: "Error checking milestone", error: error.message });
  }
};

export const updateUserDisplayName = async (req, res) => {
  try {
    const userId = req.params.id;
    const { display_name } = req.body;

    // Verify that the requesting user is the same as the user being updated
    if (req.user.id != userId) {
      return res.status(403).json({
        message: "You don't have permission to update this information",
      });
    }

    // If display_name is an empty string, set it to null
    const newDisplayName = display_name?.trim() === "" ? null : display_name;

    // Update the display_name in the database
    const [result] = await pool.query(
      "UPDATE users SET display_name = ? WHERE user_id = ?",
      [newDisplayName, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return success message
    res.status(200).json({
      message: newDisplayName
        ? "Display name updated successfully"
        : "Display name removed",
      display_name: newDisplayName,
    });
  } catch (error) {
    console.error("Error updating user display name:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating user display name" });
  }
};

// Class related methods

export const getUserClassInfo = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if the requested user ID matches the authenticated user's ID
    if (userId != req.user.id) {
      return res.status(403).json({
        message: "You don't have permission to access this information",
      });
    }

    const [rows] = await pool.query(
      `SELECT c.class_id, c.class_name, c.class_avatar
       FROM users u
       JOIN classes c ON u.class_id = c.class_id
       WHERE u.user_id = ?`,
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User or class not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching user class info:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching user class info" });
  }
};

export const updateUserClass = async (req, res) => {
  try {
    const userId = req.params.id;
    const { class_id } = req.body;

    // Verify that the requesting user is the same as the user being updated
    if (req.user.id != userId) {
      return res.status(403).json({
        message: "You don't have permission to update this information",
      });
    }

    // Validate the class_id is a positive integer
    if (!Number.isInteger(Number(class_id)) || Number(class_id) <= 0) {
      return res.status(400).json({ message: "Invalid class ID." });
    }

    // Update the user's class in the database
    const [result] = await pool.query(
      "UPDATE users SET class_id = ? WHERE user_id = ?",
      [class_id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return success message with updated class info
    res.status(200).json({
      message: "Class updated successfully",
      class_id: class_id,
    });
  } catch (error) {
    console.error("Error updating user class:", error);
    // If it's a foreign key constraint error, it means the class doesn't exist
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res
        .status(400)
        .json({ message: "Invalid class ID: class does not exist" });
    }
    res
      .status(500)
      .json({ message: "An error occurred while updating user class" });
  }
};

export const deleteUser = async (req, res) => {
  try {
      
      // const userId = req.user.id
      const userId = req.params.id

      const query = `
         DELETE FROM users 
         WHERE user_id = ?
      `;

      // Execute the query
      const [results] = await pool.query(query, [userId]);

      
      res.status(200).json(results);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
  }
};
