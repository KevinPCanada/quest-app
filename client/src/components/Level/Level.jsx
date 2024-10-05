import React from "react";
import './Level.css';

export default function LevelBar({ experience, level }) {
    const nextExp = experience % 100;
    const expToNextLevel = 100 - nextExp;
   
    return (
        <>
            <h2>Level {level}</h2>
            <div className="levelbar">
                <div className="level-progress" style={{ width: `${nextExp}%` }}></div>
            </div>
            <p>{expToNextLevel} XP to next level</p>
        </>
    );
}