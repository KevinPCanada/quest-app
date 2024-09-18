import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  // CHANGE: Added state to manage form inputs
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: ""
  });
  const [err, setError] = useState(null);
  const navigate = useNavigate();

  // CHANGE: Added handleChange function to update state
  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // CHANGE: Use inputs state instead of FormData
      const res = await fetch("http://localhost:8800/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      
      if (res.status === 409) {
        setError("User already exists");
      } else if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      } else {
        const data = await res.json();
        console.log(data);
        navigate("/login");
      }
    } catch (err) {
      setError(err.message || "An error occurred during registration");
    }
  };

  return (
    <div className="form">
      <h2>Create a new account</h2>
      <form onSubmit={handleSubmit}>
        {/* CHANGE: Updated input fields to use state */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={inputs.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={inputs.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={inputs.password}
          onChange={handleChange}
          required
        />
        {err && <p style={{ color: "red" }}>{err}</p>}
        <button type="submit" className="btn">Sign Up</button>
      </form>
      <p>Already a member? <Link to="/login">Log in</Link></p>
    </div>
  );
}

export default SignUp;