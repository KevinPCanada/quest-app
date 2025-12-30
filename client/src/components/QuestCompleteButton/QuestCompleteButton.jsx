import React, { useState, useEffect, useCallback, useContext, useRef } from "react";
import "./QuestCompleteButton.css";
import LevelUpandRewardManager from "../LevelUpandRewardManager/LevelUpandRewardManager";
import { AuthContext } from "../../context/AuthContext";
import questCompleteSound from '../../assets/sfx/quest-complete-sound.mp3';

// Added className and children to props
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
      const response = await fetch(
        `http://localhost:8800/api/user/${currentUser.user_id}/milestone-progress`,
        { credentials: "include" }
      );
      if (!response.ok) throw new Error("Failed to fetch milestone data");
      const data = await response.json();
      setMilestoneProgress(data.milestone_progress);
      setMilestone(data.milestone);
    } catch (error) { }
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
        setNewLevel(data.newLevel);
        setShowLevelUp(true);
        setMilestoneProgress(data.newMilestoneProgress);
        setMilestoneReached(data.milestoneReached);
      } else {
        onQuestComplete();
      }
    } catch (error) { }
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
        // UPDATED: Use passed className OR default to original class
        className={className || "quest-complete-button"}
        onClick={handleClick}
        disabled={showLevelUp}
      >
        {/* UPDATED: If children exist (Shadcn style), render them. 
            Otherwise, render the original default UI. */}
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