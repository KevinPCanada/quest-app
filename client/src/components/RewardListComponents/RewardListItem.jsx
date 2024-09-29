import React from "react"
import ModifyRewardsButton from "./ModifyRewardsButton";
import "./RewardListItem.css"

export default function RewardListItem({ reward }) {
  return (
    <div className="reward-list-item">
      <div className="reward-name">

        <p>{reward}</p>
      </div>
      <div className="reward-actions">
        <ModifyRewardsButton/>
        <input type="button" value="Delete" className="eightbit-btn delete-btn" />
      </div>
    </div>
  )
}
