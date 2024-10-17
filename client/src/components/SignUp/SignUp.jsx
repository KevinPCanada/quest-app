import React, { useState, useContext } from "react";
import { AuthContext } from '/src/context/AuthContext';

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
      return; // Prevent form submission if username is "Alex"
    }

    try {
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
       
        await login(inputs);
        onToggle(); // Switch to login view after successful signup
      }
    } catch (err) {
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
    </div>
  );
}

export default SignUp;
