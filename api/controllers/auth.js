import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../pool.js";

export const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Check if the user already exists in the database
    const [existingUsers] = await pool.query(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [email, username]
    );

    // If a user with the same email or username exists, return an error
    if (existingUsers.length) {
      return res.status(409).json("User already exists");
    }

    // Hash the password for security
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // Insert the new user into the database
    await pool.query(
      "INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)",
      [email, username, hash]
    );

    // Respond with a success message
    res.status(200).json("User has been created");
  } catch (error) {
    // Log the error and send a 500 status code if something goes wrong
    console.error(error);
    res.status(500).json("An error occurred during registration");
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database by username
    const [users] = await pool.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    // If no user is found, return a 404 error
    if (users.length === 0) {
      return res.status(404).json("User not found!");
    }

    // Compare the provided password with the stored hash
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      users[0].password_hash
    );

    // If the password is incorrect, return a 400 error
    if (!isPasswordCorrect) {
      return res.status(400).json("Wrong username or password");
    }

    // Create a JWT token for the user
    const token = jwt.sign({ id: users[0].user_id }, "jwtkey");

    // Remove the password hash from the user object
    const { password_hash, ...other } = users[0];

    // Set the token as an HTTP-only cookie and send the user data
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  } catch (error) {
    // Log the error and send a 500 status code if something goes wrong
    console.error(error);
    res.status(500).json("An error occurred during login");
  }
};

export const logout = (req, res) => {
  // Clear the access_token cookie to log the user out
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true,
  }).status(200).json("User has been logged out");
};