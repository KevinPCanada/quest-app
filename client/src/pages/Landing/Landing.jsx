import React from 'react'
import './Landing.css'

function Landing() {
  return (
    <div className="background-anchor">
      <button className="eightbit-btn guest-btn">Guest User</button>
      <div className="landing-container">
        <span>Welcome To</span>
        <h1>Quest-Hard</h1>
        <div className="landing-btn-container">
          <button className="eightbit-btn landing-btn">Login</button>
          <button className="eightbit-btn landing-btn">Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default Landing