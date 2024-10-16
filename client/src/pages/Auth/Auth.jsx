import React, { useState } from 'react';
import Login from '../../components/Login/Login.jsx';
import SignUp from '../../components/SignUp/SignUp.jsx';
import './Auth.css';

function Auth() {
  // State to track whether to show Login or SignUp
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);  // Toggle between Login and Sign Up
  };

  return (
    <div className='Auth'>
      <div className="toggle-container">
        <span className={`toggle-label ${isLogin ? 'active' : ''}`}>Login</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={!isLogin}
            onChange={handleToggle}
          />
          <span className="slider"></span>
        </label>
        <span className={`toggle-label ${!isLogin ? 'active' : ''}`}>Sign Up</span>
      </div>

      <div className="form-container">
        {/* Conditionally render Login or SignUp form */}
        {isLogin ? (
          <Login onToggle={handleToggle} />
        ) : (
          <SignUp onToggle={handleToggle} />
        )}
      </div>
    </div>
  );
}

export default Auth;
