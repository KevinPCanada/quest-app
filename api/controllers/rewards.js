// rewards.js (in the controllers folder)
import { pool } from "../pool.js";

// Get all rewards for the logged-in user
export const getRewards = async (req, res) => {
  try {
    const userId = req.user.id; // The user ID from the decoded token

    // Fetch all rewards for the logged-in user
    const [rewards] = await pool.query(
      "SELECT * FROM rewards WHERE user_id = ?",
      [userId]
    );

    res.status(200).json(rewards);
  } catch (error) {
    console.error(error);
    res.status(500).json("An error occurred while fetching rewards");
  }
};

// Add a new reward
export const addReward = async (req, res) => {
  try {
    const { description } = req.body;
    const userId = req.user.id; // The user ID from the decoded token

    // Insert the new reward into the database
    await pool.query(
      "INSERT INTO rewards (user_id, description, is_claimed) VALUES (?, ?, 0)",
      [userId, description]
    );

    res.status(200).json("Reward added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("An error occurred while adding the reward");
  }
};



// Claim a reward
export const claimReward = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // The user ID from the decoded token

    // Update the reward to mark it as claimed
    await pool.query(
      "UPDATE rewards SET is_claimed = 1 WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    res.status(200).json("Reward claimed successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("An error occurred while claiming the reward");
  }
};
