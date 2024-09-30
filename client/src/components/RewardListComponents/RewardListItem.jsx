import React from "react"
import ModifyRewardsButton from "./ModifyRewardsButton";
import "./RewardListItem.css"

export default function RewardListItem({ reward, onDelete, onEdit }) {

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this reward?")) {
      onDelete(reward.id);
    }
  };

  const handleEdit = (newDescription) => {
    onEdit(reward.id, newDescription);
  };

  return (
    <div className="reward-list-item">
      <div className="reward-name">
        <p>{reward.description}</p>
      </div>
      <div className="reward-actions">
        <ModifyRewardsButton reward={reward.description} onModify={handleEdit} />
        <input type="button" value="Delete" className="eightbit-btn delete-btn" onClick={handleDelete}/>
      </div>
    </div>
  )
}