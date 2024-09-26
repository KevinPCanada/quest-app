import React from "react";
import './Level.css';

//This component is for the level bar, whch will show the amount of exp needed to get to the next level and the user's current level
//you can call this component with 
//<LevelBar exp='1234'></LevelBar>
//If this is inserted, the user's level will be calculated as 12 and the exp bar should be 34% full

export default function LevelBar({exp}) {

    const nextExp = exp % 100
    const level = Math.floor(exp / 100)

    console.log(nextExp)

    return <>
    
    <h2>Level {level}</h2>
    
    <div className="levelbar">
        <div className="level-progress" style={{ width: `${nextExp}%` }}></div>
    </div>
    
    </>
}