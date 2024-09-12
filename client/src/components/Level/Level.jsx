import React from "react";

export default function LevelBar({exp}) {

    const nextExp = exp % 100
    const level = Math.floor(exp / 100)

    console.log(nextExp)

    return <>
    
    <h2>Level {level}</h2>
    
    <meter min="0" max="100" value={nextExp} ></meter>
    
    </>


}