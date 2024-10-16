import React, { useEffect, useRef, useState } from 'react'; // Make sure to import useState
import { useNavigate } from "react-router-dom";
import './Landing.css';
import ground from '../../assets/img/landing-page/ground.png';
import bush from '../../assets/img/landing-page/bush.png';
import tree from '../../assets/img/landing-page/tree.png';
import cloud from '../../assets/img/landing-page/cloud.png';
import mountain from '../../assets/img/landing-page/mountain.png';
import castle from '../../assets/img/landing-page/castle.png';
import questCompleteSound from '../../assets/sfx/quest-complete-sound.mp3';

function Landing() {
  const [isAnimating, setIsAnimating] = useState(false);
  const audioRef = useRef(new Audio(questCompleteSound));
  const navigate = useNavigate();

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0.2; // Set the volume to 20%

    // No cleanup function needed as we want the audio to continue playing if unmounted
  }, []);

  // Function to play the quest complete sound
  const playAudio = () => {
    const audio = audioRef.current;
    audio.currentTime = 0; // Reset audio to start
    audio.play().catch(error => {
      // Error handling can be implemented here if needed
    });
  };

  const handleStartClick = () => {
    // Start the animation
    setIsAnimating(true);
    playAudio();

    // Navigate to /auth2 after the animation
    setTimeout(() => {
      navigate('/auth');
    }, 1000); // Adjust the timeout to match the animation duration
  };

  return (  // Make sure this return is inside the component function
    <main className="landing-background">
      {/* SVG filter for pixelation */}
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <filter id="pixelate">
          <feFlood x="4" y="4" height="4" width="4" />
          <feComposite width="1" height="1" operator="in" />
        </filter>
      </svg>

      <div className={`landing-container ${isAnimating ? 'animate-out' : ''}`}>
        <span>Welcome To</span>
        <h1>Quest-Hard</h1>
        <div className="landing-btn-container">
          <button className="eightbit-btn landing-btn" onClick={handleStartClick}>
            Start
          </button>
        </div>
      </div>

      {/* Clouds */}
      <img src={cloud} className="cloud cloud1" alt="Cloud 1" />
      <img src={cloud} className="cloud cloud2" alt="Cloud 2" />
      <img src={cloud} className="cloud cloud3" alt="Cloud 3" />
      <img src={cloud} className="cloud cloud4" alt="Cloud 4" />

      {/* Mountain and Castle */}
      <img src={mountain} className="mountain" alt="Mountain" />
      <img src={castle} className="castle" alt="Castle" />

      {/* Ground and Bushes */}
      <div className="ground-container">
        <div className="bush-container">
          <img src={bush} className="bush" alt="Bush 1" />
          <img src={tree} className="tree" alt="Tree" />
          <img src={bush} className="bush" alt="Bush 2" />
          <img src={bush} className="bush" alt="Bush 3" />
          <img src={bush} className="bush" alt="Bush 4" />
        </div>
        <img src={ground} className="ground" alt="Ground" />
      </div>
    </main>
  );
}

export default Landing;
