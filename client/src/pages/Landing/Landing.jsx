import React from 'react'
import './Landing.css'

function Landing() {
  return (
    <main className="landing-background">
      {/* <button className="eightbit-btn guest-btn">Guest User</button> */}
      <div className="landing-container">
        <span>Welcome To</span>
        <h1>Quest-Hard</h1>
        <div className="landing-btn-container">
          <button className="eightbit-btn landing-btn">Start</button>
        </div>
      </div>
    </main>
  )
}

export default Landing