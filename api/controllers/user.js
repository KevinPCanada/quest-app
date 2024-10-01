import { pool } from "../pool.js";

export const getUser = async (req, res) => {

    try {
      const userId = req.params.id;
  
      // Fetch the specific user info for the logged-in user
      const [user] = await pool.query(
        "SELECT * FROM users WHERE user_id = ?",
        [userId]
      );
  
      // Check if a user was found
      if (user.length === 0) {
        return res.status(404).json({ message: "User not found or you don't have permission to view it" });
      }

         // Destructure the user object to exclude password_hash
         const { password_hash, ...userWithoutPassword } = user[0];
  
      // Return the found user
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while fetching the user" });
    }
}

export const getUserExp = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Verify that the requesting user is the same as the user being queried
    if (req.user.id != userId) {
      return res.status(403).json({ message: "You don't have permission to access this information" });
    }

    const [rows] = await pool.query(
      "SELECT experience FROM users WHERE user_id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ experience: rows[0].experience });
  } catch (error) {
    console.error('Error fetching user experience:', error);
    res.status(500).json({ message: "An error occurred while fetching user experience" });
  }
};

export const getUserMilestone = async (req, res) => {
  try {
    const userId = req.params.id;

    // Verify that the requesting user is the same as the user being queried
    if (req.user.id != userId) {
      return res.status(403).json({ message: "You don't have permission to access this information" });
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
    console.error('Error fetching user milestone:', error);
    res.status(500).json({ message: "An error occurred while fetching user milestone" });
  }
};

export const updateUserMilestone = async (req, res) => {
  try {
    const userId = req.params.id;
    const { milestone } = req.body;

    // Verify that the requesting user is the same as the user being updated
    if (req.user.id != userId) {
      return res.status(403).json({ message: "You don't have permission to update this information" });
    }

    // Validate the milestone value
    if (!['1', '2', '5', '10'].includes(milestone)) {
      return res.status(400).json({ message: "Invalid milestone value. Must be 1, 2, 5, or 10." });
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
    res.status(200).json({ message: "Milestone updated successfully", milestone });
  } catch (error) {
    console.error('Error updating user milestone:', error);
    res.status(500).json({ message: "An error occurred while updating user milestone" });
  }
};