// This file creates a central place to manage user login information.
// It's like a shared notebook that any part of the app can read from or write to.
// This helps keep track of whether a user is logged in and who they are/what they do.

import React, { createContext, useState, useEffect } from "react";

// Create a new "notebook" (context) for storing login information
export const AuthContext = createContext();

// This is the main function that sets up our "notebook"
export const AuthContextProvider = ({ children }) => {
  // Check if there's any saved user information when the app starts
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    try {
      // If there's saved info, use it; otherwise, start with no user
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error("Couldn't read saved user info", e);
      return null;
    }
  });

  // This function handles logging in
  const login = async (inputs) => {
    try {
      // Send login details to the server
      const res = await fetch("http://localhost:8800/api/auth/login", {
        method: "POST",
        credentials: "include", // This allows the server to set cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs), // Send login info as a special format
      });

      // If login fails, explain why
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Wrong username or password");
        } else {
          throw new Error("Login problem. Please try again.");
        }
      }

      // If login succeeds, save the user info
      const data = await res.json();
      setCurrentUser(data);
      return data;
    } catch (err) {
      throw err; // If there's an error, let other parts of the app know
    }
  };

  // This function handles logging out
  const logout = async () => {
    try {
      // Tell the server we're logging out
      const res = await fetch("http://localhost:8800/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Logout didn't work");
      }

      // Clear user info from our app and storage
      setCurrentUser(null);
      localStorage.removeItem("user");
    } catch (err) {
      console.error("Logout problem:", err);
      // Even if server logout fails, clear user info locally
      setCurrentUser(null);
      localStorage.removeItem("user");
    }
  };

  // Save user info to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  // This function gets the list of rewards for a user
  const fetchRewards = async () => {
    try {
      // Ask the server for the rewards
      const res = await fetch("http://localhost:8800/api/rewards", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Couldn't get rewards");
      }

      return await res.json(); // Return the rewards data
    } catch (err) {
      console.error("Problem getting rewards:", err);
      throw err;
    }
  };

  // function for Guest Login
  const guestLogin = async () => {
    try {
      const res = await fetch("http://localhost:8800/api/auth/guest", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Guest login failed");
      }

      const data = await res.json();
      setCurrentUser(data);
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // Make all these functions and data available to the rest of the app
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout, fetchRewards, guestLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

