import { pool } from "../pool.js";

export const getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Fetch the specific user info for the logged-in user
    const [user] = await pool.query("SELECT * FROM users WHERE user_id = ?", [
      userId,
    ]);

    // Check if a user was found
    if (user.length === 0) {
      return res
        .status(404)
        .json({
          message: "User not found or you don't have permission to view it",
        });
    }

    // Destructure the user object to exclude password_hash
    const { password_hash, ...userWithoutPassword } = user[0];

    // Return the found user
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

    // Verify that the requesting user is the same as the user being queried
    if (req.user.id != userId) {
      return res
        .status(403)
        .json({
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

    res.status(200).json({ experience: rows[0].experience });
  } catch (error) {
    console.error("Error fetching user experience:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching user experience" });
  }
};

export const getUserMilestone = async (req, res) => {
  try {
    const userId = req.params.id;

    // Verify that the requesting user is the same as the user being queried
    if (req.user.id != userId) {
      return res
        .status(403)
        .json({
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
      return res
        .status(403)
        .json({
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
    const newDisplayName = display_name?.trim() === '' ? null : display_name;

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
      message: newDisplayName ? "Display name updated successfully" : "Display name removed",
      display_name: newDisplayName 
    });
  } catch (error) {
    console.error("Error updating user display name:", error);
    res.status(500).json({ message: "An error occurred while updating user display name" });
  }
};


// Class related methods

export const getUserClassInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Check if the requested user ID matches the authenticated user's ID
    if (userId != req.user.id) {
      return res.status(403).json({ message: "You don't have permission to access this information" });
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
    console.error('Error fetching user class info:', error);
    res.status(500).json({ message: "An error occurred while fetching user class info" });
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
      class_id: class_id
    });
  } catch (error) {
    console.error("Error updating user class:", error);
    // If it's a foreign key constraint error, it means the class doesn't exist
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ message: "Invalid class ID: class does not exist" });
    }
    res.status(500).json({ message: "An error occurred while updating user class" });
  }
};
