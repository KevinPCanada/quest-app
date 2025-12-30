import React, { useCallback } from "react";
import QuestCompleteButton from "../QuestCompleteButton/QuestCompleteButton";
import EditQuest from "../EditQuest/EditQuest";
import FullQuest from "../Full_Quest/Full_Quest";
import "./Quest.css";

function Quest({
  title,
  description,
  exp,
  id,
  level,
  updateQuests,
  updateUserData,
}) {
  
  // Handler for quest completion
  const handleQuestComplete = useCallback(async () => {
    console.log("Quest complete callback triggered");
    await updateQuests();
    await updateUserData();
  }, [updateQuests, updateUserData]);

  return (
    <article className="quest-container">
      <div className="quest-container-bottom">
        <div className="quest-header">
          <div className="quest-header-text">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <QuestCompleteButton
            thisQuestId={id}
            exp={exp}
            onQuestComplete={handleQuestComplete}
          />
        </div>

        <div className="quest-options flex gap-2">
          <FullQuest
            Quest={{ title, description, level, exp }}
            id={id}
            exp={exp}
            updateQuests={updateQuests}
            updateUserData={updateUserData}
          />

          <EditQuest 
            thisQuestId={id} 
            updateQuests={updateQuests} 
            title={title} 
            description={description} 
          />
        </div>
      </div>
    </article>
  );
}

export default Quest;