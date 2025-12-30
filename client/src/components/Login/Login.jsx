import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "/src/context/AuthContext";

function Login({ onToggle }) {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      setError(null);
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  const { guestLogin } = useContext(AuthContext);

  const handleGuestPlay = async () => {
    try {
      await guestLogin();
      navigate("/"); // Redirect to home
    } catch (err) {
      // Handle error
    }
  };

  return (
    <div className="form">
      <p className="loginFormText">Login to your account</p>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn">
          Login
        </button>
        <button onClick={handleGuestPlay} className="...">
          Continue as Guest
        </button>
      </form>
      {/* <p>Not a member? <button onClick={onToggle}>Sign Up</button></p> */}
    </div>
  );
}

export default Login;
