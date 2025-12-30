import React, { useState, useEffect, useCallback, useContext, useRef } from "react";
import "./QuestCompleteButton.css";
import LevelUpandRewardManager from "../LevelUpandRewardManager/LevelUpandRewardManager";
import { AuthContext } from "../../context/AuthContext";
import questCompleteSound from '../../assets/sfx/quest-complete-sound.mp3';
import { apiRequest } from "../../lib/apiRequest"; // Import helper

function QuestCompleteButton({ exp, thisQuestId, onQuestComplete, className, children }) {
  const { currentUser } = useContext(AuthContext);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(null);
  const [milestoneProgress, setMilestoneProgress] = useState(0);
  const [milestone, setMilestone] = useState(null);
  const [milestoneReached, setMilestoneReached] = useState(false);
  
  const audioRef = useRef(new Audio(questCompleteSound));

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0.2; 
  }, []);

  const fetchMilestoneData = useCallback(async () => {
    if (!currentUser || !currentUser.user_id) return;
    try {
     
      const data = await apiRequest(`/user/${currentUser.user_id}/milestone-progress`, "GET");
      
      setMilestoneProgress(data.milestone_progress);
      setMilestone(data.milestone);
    } catch (error) { 
      // Silent error handling as per original code
    }
  }, [currentUser]);

  useEffect(() => {
    fetchMilestoneData();
  }, [fetchMilestoneData]);

  const playAudio = () => {
    const audio = audioRef.current;
    audio.currentTime = 0; 
    audio.play().catch(error => { });
  };

  const handleClick = useCallback(async (e) => {
    e.preventDefault();
    playAudio();

    try {
      // CLEANER: PUT request with body
      const data = await apiRequest(`/quests/complete-quest/${thisQuestId}`, "PUT", { 
        questId: thisQuestId 
      });

      if (data.leveledUp) {
        setNewLevel(data.newLevel);
        setShowLevelUp(true);
        setMilestoneProgress(data.newMilestoneProgress);
        setMilestoneReached(data.milestoneReached);
      } else {
        onQuestComplete();
      }
    } catch (error) { 
      console.error("Failed to complete quest:", error);
    }
  }, [thisQuestId, onQuestComplete]);

  const handleFinalClose = useCallback(() => {
    setShowLevelUp(false);
    setNewLevel(null);
    setMilestoneReached(false);
    onQuestComplete();
  }, [onQuestComplete]);

  return (
    <div className="relative">
      <button
        className={className || "quest-complete-button"}
        onClick={handleClick}
        disabled={showLevelUp}
      >
        {children ? children : (
            <>
                <span className="hide-600">Quest Complete</span>
                <i className="material-icons">done_outline</i>
                <p>+{exp} EXP</p>
            </>
        )}
      </button>

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