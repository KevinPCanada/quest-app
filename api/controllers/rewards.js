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

// Get a Single Reward
export const getReward = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Fetch the specific reward for the logged-in user
    const [rewards] = await pool.query(
      "SELECT * FROM rewards WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    // Check if a reward was found
    if (rewards.length === 0) {
      return res.status(404).json({ message: "Reward not found or you don't have permission to view it" });
    }

    // Return the found reward
    res.status(200).json(rewards[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching the reward" });
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

// Edit a reward
export const editReward = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const userId = req.user.id;

    // First, check if the reward belongs to the user
    const [reward] = await pool.query(
      "SELECT * FROM rewards WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    if (reward.length === 0) {
      return res.status(404).json("Reward not found or you don't have permission to edit it");
    }

    // If the reward exists and belongs to the user, update it
    await pool.query(
      "UPDATE rewards SET description = ? WHERE id = ? AND user_id = ?",
      [description, id, userId]
    );

    res.status(200).json("Reward updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("An error occurred while updating the reward");
  }
};

export const deleteReward = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // First, check if the reward exists and belongs to the user
    const [reward] = await pool.query(
      "SELECT * FROM rewards WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    if (reward.length === 0) {
      return res.status(404).json({ message: "Reward not found or you don't have permission to delete it" });
    }

    // If the reward exists and belongs to the user, delete it
    await pool.query(
      "DELETE FROM rewards WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    res.status(200).json({ message: "Reward deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while deleting the reward" });
  }
};
