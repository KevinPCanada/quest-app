import React from "react";
import "./QuestCompleteButton.css";

function QuestCompleteButton({ exp, thisQuestId, updateQuests, updateUserData, onComplete }) {
  const handleClick = async (e) => {
    e.preventDefault();
    console.log("Quest ID:", thisQuestId);
    try {
      const response = await fetch(`http://localhost:8800/api/quests/complete-quest/${thisQuestId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ questId: thisQuestId }),
      });
      if (!response.ok) {
        throw new Error('Failed to complete quest');
      }
      const data = await response.json();
      console.log('Quest completed successfully:', data);
      
      // Call the provided callbacks
      await updateQuests();
      await updateUserData();
      if (onComplete) {
        onComplete();
      }
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