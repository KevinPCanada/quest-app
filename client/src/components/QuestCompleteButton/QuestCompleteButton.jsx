import React, { useState, useEffect, useCallback } from "react";
import "./QuestCompleteButton.css";
import LevelUpCard from "../LevelUpCard/LevelUpCard";

function QuestCompleteButton({ exp, thisQuestId, onQuestComplete }) {
  // State to control the visibility of the LevelUpCard
  // This allows us to show/hide the card based on user actions
  const [showLevelUp, setShowLevelUp] = useState(false);

  // State to store the new level when a level up occurs
  // This is passed to the LevelUpCard component for display
  const [newLevel, setNewLevel] = useState(null);

  // handleClick is wrapped in useCallback to optimize performance
  // It prevents unnecessary re-renders of child components that depend on this function
  const handleClick = useCallback(async (e) => {
    e.preventDefault();
    console.log("Quest complete button clicked. Quest ID:", thisQuestId);

    try {
      // Send a PUT request to mark the quest as complete
      // We use PUT because we're updating the state of an existing resource (the quest)
      const response = await fetch(`http://localhost:8800/api/quests/complete-quest/${thisQuestId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Includes cookies in the request, important for authentication
        body: JSON.stringify({ questId: thisQuestId }),
      });

      if (!response.ok) {
        throw new Error('Failed to complete quest');
      }

      const data = await response.json();
      console.log('Quest completed successfully. Response data:', data);
     
      if (data.leveledUp) {
        // If the user leveled up, we show the LevelUpCard
        console.log("Level up detected! New level:", data.newLevel);
        setNewLevel(data.newLevel);
        setShowLevelUp(true);
      } else {
        console.log("No level up occurred.");
        // If no level up, update quests and user data immediately
        // This ensures the UI reflects the completed quest without delay
        onQuestComplete();
      }
    } catch (error) {
      console.error('Error completing quest:', error);
      // We might want to add user feedback here in case of an error
    }
  }, [thisQuestId, onQuestComplete]);

  // handleCloseLevelUp is also wrapped in useCallback for the same performance reasons
  const handleCloseLevelUp = useCallback(() => {
    console.log("Closing level up card");
    // Reset the level up related states
    setShowLevelUp(false);
    setNewLevel(null);
    // Update quests and user data after closing the level up card
    // This ensures that the main UI is updated after the user has seen their level up
    onQuestComplete();
  }, [onQuestComplete]);

  console.log("Rendering QuestCompleteButton. showLevelUp:", showLevelUp, "newLevel:", newLevel);

  return (
    <div className="relative">
      {/* The quest complete button is disabled when showing the level up card 
          This prevents multiple submissions while processing */}
      <button className="quest-complete-button" onClick={handleClick} disabled={showLevelUp}>
        <span>Quest Complete</span>
        <i className="material-icons">done_outline</i>
        <p>+{exp} EXP</p>
      </button>

      {/* Conditional rendering of the LevelUpCard
          We only show it when both showLevelUp is true and newLevel has a value */}
      {showLevelUp && newLevel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
          <LevelUpCard newLevel={newLevel} onClose={handleCloseLevelUp} />
        </div>
      )}
    </div>
  );
}

export default QuestCompleteButton;