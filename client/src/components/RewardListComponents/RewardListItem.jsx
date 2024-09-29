import React from "react"
import "./RewardListItem.css"

export default function RewardListItem({ reward }) {
  return (
    <div className="reward-list-item">
      <div className="reward-name">

        <p>{reward}</p>
      </div>
      <div className="reward-actions">
        <input type="button" value="Modify" className="eightbit-btn modify-btn" />
        <input type="button" value="Delete" className="eightbit-btn delete-btn" />
      </div>
    </div>
  )
}
