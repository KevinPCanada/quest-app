import React, { useState, useEffect, useCallback, useContext, useRef } from "react";
import "./QuestCompleteButton.css";
import LevelUpandRewardManager from "../LevelUpandRewardManager/LevelUpandRewardManager";
import { AuthContext } from "../../context/AuthContext";
import questCompleteSound from '../../assets/sfx/quest-complete-sound.mp3';

function QuestCompleteButton({ exp, thisQuestId, onQuestComplete }) {
  const { currentUser } = useContext(AuthContext);
  // State for managing level up and milestone information
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(null);
  const [milestoneProgress, setMilestoneProgress] = useState(0);
  const [milestone, setMilestone] = useState(null);
  const [milestoneReached, setMilestoneReached] = useState(false);
  
  // Create a persistent reference to the Audio object
  const audioRef = useRef(new Audio(questCompleteSound));

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0.2; // Set the volume to 20%
    
    // No cleanup function needed as we want the audio to continue playing if unmounted
  }, []);

  // Function to fetch milestone data from the server
  const fetchMilestoneData = useCallback(async () => {
    if (!currentUser || !currentUser.user_id) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8800/api/user/${currentUser.user_id}/milestone-progress`,
        { credentials: "include" }
      );
      if (!response.ok) throw new Error("Failed to fetch milestone data");
      const data = await response.json();
      setMilestoneProgress(data.milestone_progress);
      setMilestone(data.milestone);
    } catch (error) {
      // Error handling can be implemented here if needed
    }
  }, [currentUser]);

  // Fetch milestone data when the component mounts
  useEffect(() => {
    fetchMilestoneData();
  }, [fetchMilestoneData]);

  // Function to play the quest complete sound
  const playAudio = () => {
    const audio = audioRef.current;
    audio.currentTime = 0; // Reset audio to start
    audio.play().catch(error => {
      // Error handling can be implemented here if needed
    });
  };

  // Handler for quest completion
  const handleClick = useCallback(async (e) => {
    e.preventDefault();
    playAudio();

    try {
      const response = await fetch(
        `http://localhost:8800/api/quests/complete-quest/${thisQuestId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ questId: thisQuestId }),
        }
      );
      if (!response.ok) throw new Error("Failed to complete quest");
      
      const data = await response.json();

      if (data.leveledUp) {
        // Update state for level up scenario
        setNewLevel(data.newLevel);
        setShowLevelUp(true);
        setMilestoneProgress(data.newMilestoneProgress);
        setMilestoneReached(data.milestoneReached);
      } else {
        // If no level up, call the completion callback
        onQuestComplete();
      }
    } catch (error) {
      // Error handling can be implemented here if needed
    }
  }, [thisQuestId, onQuestComplete]);

  // Handler for closing the level up display
  const handleFinalClose = useCallback(() => {
    setShowLevelUp(false);
    setNewLevel(null);
    setMilestoneReached(false);
    onQuestComplete();
  }, [onQuestComplete]);

  return (
    <div className="relative">
      <button
        className="quest-complete-button"
        onClick={handleClick}
        disabled={showLevelUp}
      >
        <span className="hide-600">Quest Complete</span>
        <i className="material-icons">done_outline</i>
        <p>+{exp} EXP</p>
      </button>
      {/* Render LevelUpandRewardManager component if user leveled up */}
      {showLevelUp && newLevel && (
        <LevelUpandRewardManager
          key={newLevel}
          newLevel={newLevel}
          onClose={handleFinalClose}
          milestoneReached={milestoneReached}
          milestoneProgress={milestoneProgress}
          milestone={milestone}
        />
      )}
    </div>
  );
}

export default QuestCompleteButton;