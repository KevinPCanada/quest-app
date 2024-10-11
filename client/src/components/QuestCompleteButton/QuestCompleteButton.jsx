import React, { useState, useEffect, useCallback, useContext } from "react";
import "./QuestCompleteButton.css";
import LevelUpandRewardManager from "../LevelUpandRewardManager/LevelUpandRewardManager";
import { AuthContext } from "../../context/AuthContext";

function QuestCompleteButton({ exp, thisQuestId, onQuestComplete }) {
  const { currentUser } = useContext(AuthContext);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(null);
  const [milestoneProgress, setMilestoneProgress] = useState(0);
  const [milestone, setMilestone] = useState(null);
  const [milestoneReached, setMilestoneReached] = useState(false);

  const fetchMilestoneData = useCallback(async () => {
    if (!currentUser || !currentUser.user_id) {
      console.error("User ID is not available");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8800/api/user/${currentUser.user_id}/milestone-progress`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch milestone data");
      }
      const data = await response.json();
      console.log("Fetched milestone data:", data);
      setMilestoneProgress(data.milestone_progress);
      setMilestone(data.milestone);
    } catch (error) {
      console.error("Error fetching milestone data:", error);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchMilestoneData();
  }, [fetchMilestoneData]);

  useEffect(() => {
    console.log(
      "milestoneProgress or milestone changed:",
      milestoneProgress,
      milestone
    );
  }, [milestoneProgress, milestone]);

  const handleClick = useCallback(
    async (e) => {
      e.preventDefault();
      console.log("Quest complete button clicked. Quest ID:", thisQuestId);
      try {
        const response = await fetch(
          `http://localhost:8800/api/quests/complete-quest/${thisQuestId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ questId: thisQuestId }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to complete quest");
        }
        const data = await response.json();
        console.log("Quest completed successfully. Full response data:", data);

        if (data.leveledUp) {
          console.log("Level up detected! New level:", data.newLevel);
          console.log("New milestone progress:", data.newMilestoneProgress);
          console.log("Milestone reached:", data.milestoneReached);
          setNewLevel(data.newLevel);
          setShowLevelUp(true);
          setMilestoneProgress(data.newMilestoneProgress);
          setMilestoneReached(data.milestoneReached);

          // No need to fetch milestone data again, as we have it from the response
          // await fetchMilestoneData();
        } else {
          console.log("No level up occurred.");
          onQuestComplete();
        }
      } catch (error) {
        console.error("Error completing quest:", error);
      }
    },
    [thisQuestId, onQuestComplete]
  );

  const handleFinalClose = useCallback(() => {
    console.log("Final close of LevelUp and Reward process");
    setShowLevelUp(false);
    setNewLevel(null);
    setMilestoneReached(false);
    onQuestComplete();
  }, [onQuestComplete]);

  console.log(
    "Rendering QuestCompleteButton. showLevelUp:",
    showLevelUp,
    "newLevel:",
    newLevel,
    "milestoneProgress:",
    milestoneProgress,
    "milestone:",
    milestone,
    "milestoneReached:",
    milestoneReached
  );

  return (
    <div className="relative">
      <button
        className="quest-complete-button"
        onClick={handleClick}
        disabled={showLevelUp}
      >
        <span className="hide">Quest Complete</span>
        <i className="material-icons">done_outline</i>
        <p>+{exp} EXP</p>
      </button>
      {showLevelUp && newLevel && (
        <LevelUpandRewardManager
          key={Date.now()}
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
