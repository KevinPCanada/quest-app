import React, { createContext, useState, useEffect } from "react";
import { apiRequest } from "../lib/apiRequest"; // Import the helper

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const login = async (inputs) => {
    // ONE LINE: No headers, no stringify, no full URL needed.
    const data = await apiRequest("/auth/login", "POST", inputs);
    setCurrentUser(data);
    return data;
  };

  const logout = async () => {
    try {
      await apiRequest("/auth/logout", "POST");
    } finally {
      // Always clear local state even if server fails
      setCurrentUser(null);
      localStorage.removeItem("user");
    }
  };

  const fetchRewards = async () => {
    return await apiRequest("/rewards", "GET");
  };

  const guestLogin = async () => {
    const data = await apiRequest("/auth/guest", "POST");
    setCurrentUser(data);
    return data;
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout, fetchRewards, guestLogin }}>
      {children}
    </AuthContext.Provider>
  );
};