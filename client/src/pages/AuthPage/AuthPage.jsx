import React, { useState } from 'react';
import Auth from '../Auth/Auth.jsx';
import './AuthPage.css';

import ground from '../../assets/img/landing-page/ground.png';
import bush from '../../assets/img/landing-page/bush.png';
import tree from '../../assets/img/landing-page/tree.png';
import cloud from '../../assets/img/landing-page/cloud.png';
import mountain from '../../assets/img/landing-page/mountain.png';
import castle from '../../assets/img/landing-page/castle.png';

function AuthPage() {
  return (
    <main className="auth-background">
      <div className="auth-container">
        <Auth/>  
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

export default AuthPage;
