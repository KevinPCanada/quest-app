import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../pool.js";
import { v4 as uuidv4 } from 'uuid'; // Import UUID for Guest data generation

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
      secure: process.env.NODE_ENV === "production", // use secure cookies in production
      sameSite: 'strict', // prevents CSRF attacks
      maxAge: 24 * 60 * 60 * 1000 
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
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: 'strict'
  }).status(200).json("User has been logged out");
};

// Guest Controllers

export const guestLogin = async (req, res) => {
  try {
    // 1. Generate Fake Credentials
    const uniqueId = uuidv4().slice(0, 8); // Short random string
    const guestUsername = `Guest_${uniqueId}`;
    const guestEmail = `${guestUsername}@guest.questapp.com`; // Fake email to satisfy DB constraint
    const randomPassword = uuidv4(); // Random password user never needs to know
    
    // 2. Hash the random password (to satisfy Not Null constraint)
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(randomPassword, salt);

    // 3. Set Default Stats (Based on schema requirements)
    const defaultClassId = 1; // might need to change this to a valid ID from 'classes' table
    const defaultLevel = 1;
    const defaultExp = 0;
    const defaultMilestone = 1;
    const defaultMilestoneProgress = 0;

    // 4. Insert the Guest User
    // Note: explicitly set is_guest = TRUE
    const q = "INSERT INTO users (username, email, password_hash, display_name, class_id, level, experience, milestone, milestone_progress, is_guest) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    const [result] = await pool.query(q, [
      guestUsername, 
      guestEmail, 
      hash, 
      "Traveler", // Default Display Name
      defaultClassId,
      defaultLevel,
      defaultExp,
      defaultMilestone,
      defaultMilestoneProgress,
      true // is_guest
    ]);

    // 5. Immediate Login (Generate Token)
    // use result.insertId to get the ID of the user just created
    const token = jwt.sign({ id: result.insertId }, "jwtkey");

    // 6. Send Cookie and Response (Same as your standard login)
    // construct the user object manually to avoid an extra DB SELECT query
    const guestUser = {
        user_id: result.insertId,
        username: guestUsername,
        email: guestEmail,
        display_name: "Traveler",
        is_guest: 1, // distinct flag for frontend
        // ... add other fields if your frontend needs them immediately
    };

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      })
      .status(200)
      .json(guestUser);

  } catch (error) {
    console.error(error);
    res.status(500).json("An error occurred during guest login");
  }
};