import React, { useState, useEffect, useCallback } from "react";
import "./QuestCompleteButton.css";
import LevelUpCard from "../LevelUpCard/LevelUpCard";

function QuestCompleteButton({ exp, thisQuestId, onQuestComplete }) {
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(null);

  const handleClick = useCallback(async (e) => {
    e.preventDefault();
    console.log("Quest complete button clicked. Quest ID:", thisQuestId);
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
      console.log('Quest completed successfully. Response data:', data);
     
      if (data.leveledUp) {
        console.log("Level up detected! New level:", data.newLevel);
        setNewLevel(data.newLevel);
        setShowLevelUp(true);
      } else {
        console.log("No level up occurred.");
        // If no level up, update quests and user data immediately
        onQuestComplete();
      }
    } catch (error) {
      console.error('Error completing quest:', error);
    }
  }, [thisQuestId, onQuestComplete]);

  const handleCloseLevelUp = useCallback(() => {
    console.log("Closing level up card");
    setShowLevelUp(false);
    setNewLevel(null);
    // Update quests and user data after closing the level up card
    onQuestComplete();
  }, [onQuestComplete]);

  console.log("Rendering QuestCompleteButton. showLevelUp:", showLevelUp, "newLevel:", newLevel);

  return (
    <div className="relative">
      <button className="quest-complete-button" onClick={handleClick} disabled={showLevelUp}>
        <span>Quest Complete</span>
        <i className="material-icons">done_outline</i>
        <p>+{exp} EXP</p>
      </button>
      {showLevelUp && newLevel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
          <LevelUpCard newLevel={newLevel} onClose={handleCloseLevelUp} />
        </div>
      )}
    </div>
  );
}

export default QuestCompleteButton;