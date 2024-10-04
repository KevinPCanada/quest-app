import React from "react";
import "./QuestCompleteButton.css";

function QuestCompleteButton({ exp, onClick, thisQuestId, updateQuests }) {

  const handleClick = async (e) => {
    e.preventDefault();

    const questId = thisQuestId;
    console.log(questId)
    try {
      const response = await fetch(`http://localhost:8800/api/quests/complete-quest/${questId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ questId }),
      });

      if (!response.ok) {
        throw new Error('Failed to complete quest');
      }

      updateQuests()
      console.log('Quest completed successfully');
      
    } catch (error) {
      console.error('Error completing quest:', error);
    }
  };

  return (
    <button className="quest-complete-button" onClick={handleClick}>
      <span>Quest Complete</span>
      <i className="material-icons">done_outline</i>
      <p>+{exp} EXP</p>
    </button>
  );
}

export default QuestCompleteButton;