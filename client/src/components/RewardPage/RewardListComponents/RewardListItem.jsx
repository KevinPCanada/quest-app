import React from "react";

export default function RewardListItem({reward}) {
    
    return <>
        <p>{reward}</p>
        <input type='button' value='modify'/>
        <input type='button' value='delete'/>
    </>
}