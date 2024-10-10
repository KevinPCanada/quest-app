import React, { useState, useEffect, useCallback } from "react";
import "./QuestCompleteButton.css";
import LevelUpandRewardManager from "../LevelUpandRewardManager/LevelUpandRewardManager";
import questCompleteSound from '../../assets/sfx/quest-complete-sound.mp3'; // Import audio file

function QuestCompleteButton({ exp, thisQuestId, onQuestComplete }) {
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(null);
  const [audio] = useState(new Audio(questCompleteSound)); // Initialize audio in state

  useEffect(() => {
    audio.load(); // Preload the audio when the component mounts
  }, [audio]);

  const handleClick = useCallback(async (e) => {
    e.preventDefault();
    console.log("Quest complete button clicked. Quest ID:", thisQuestId);

    // Play preloaded audio
    audio.volume = 0.3; // Set the volume to 30%
    audio.currentTime = 0; // Ensure the sound starts from the beginning if it's already played
    audio.play(); // Play the preloaded sound

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
        onQuestComplete();
      }
    } catch (error) {
      console.error('Error completing quest:', error);
    }
  }, [thisQuestId, onQuestComplete]);

  // New handleFinalClose function
  const handleFinalClose = useCallback(() => {
    console.log("Final close of LevelUp and Reward process");
    setShowLevelUp(false);
    setNewLevel(null);
    onQuestComplete();
  }, [onQuestComplete]);

  console.log("Rendering QuestCompleteButton. showLevelUp:", showLevelUp, "newLevel:", newLevel);

  return (
    <div className="relative">
      <button className="quest-complete-button" onClick={handleClick} disabled={showLevelUp}>
        <span className="hide-600">Quest Complete</span>
        <i className="material-icons">done_outline</i>
        <p>+{exp} EXP</p>
      </button>
      {showLevelUp && newLevel && (
        <LevelUpandRewardManager newLevel={newLevel} onClose={handleFinalClose} />
      )}
    </div>
  );
}

export default QuestCompleteButton;