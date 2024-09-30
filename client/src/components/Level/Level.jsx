import React from "react";
import './Level.css';

export default function LevelBar({exp}) {
    const expNumber = Number(exp);
    const level = Math.floor(expNumber / 100) + 1; // Add 1 to start at level 1
    const nextExp = expNumber % 100;
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