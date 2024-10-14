// LevelBarSkeleton.jsx
import React from "react";
import './Level.css';

export default function LevelBarSkeleton() {
    return (
        <>
            <h2 className="skeleton-text">Level </h2>
            <div className="levelbar skeleton-bar">
                <div className="level-progress" style={{ width: '0%' }}></div>
            </div>
            <p className="skeleton-text">XP to next level</p>
        </>
    );
}