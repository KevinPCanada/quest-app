import React, { useState, useContext } from "react";
// Ensure this path matches your file structure, usually relative like ../../context/AuthContext
import { AuthContext } from '../../context/AuthContext'; 
import { apiRequest } from "../../lib/apiRequest"; // Import helper

function SignUp({ onToggle }) { 
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: ""
  });
  const [err, setError] = useState(null);
  const { login } = useContext(AuthContext); 

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the username is "Alex"
    if (inputs.username.toLowerCase() === "alex") {
      setError("Sorry, Alex. You are not permitted to create an account.");
      return; 
    }

    try {
      // CLEANER: POST request
      // apiRequest throws an error automatically if the server returns 409 or 500
      await apiRequest("/auth/register", "POST", inputs);
      
      // If we get here, registration was successful
      await login(inputs);
      onToggle(); 
      
    } catch (err) {
      // This catches 409 (User exists) and 500 (Server error)
      // Make sure your backend sends { message: "User already exists" }
      setError(err.message || "An error occurred during registration");
    }
  };

  return (
    <div className="form">
      <p className="signupFormText">Create a new account</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={inputs.email}
          onChange={handleChange}
          required
          className="w-full box-border p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={inputs.username}
          onChange={handleChange}
          required
          className="w-full box-border p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={inputs.password}
          onChange={handleChange}
          required
          className="w-full box-border p-2 mb-2 border border-gray-300 rounded"
        />
        {err && <p style={{ color: "red" }}>{err}</p>}
        <button type="submit" className="btn">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;