import React, { useState, useCallback } from "react";
import QuestCompleteButton from "../QuestCompleteButton/QuestCompleteButton";
import EditQuest from "../EditQuest/EditQuest";
import FullQuest from "../Full_Quest/Full_Quest";
import Modal from "../Modal/Modal";
import "../Quest/Quest.css";

function Quest({
  title,
  description,
  exp,
  id,
  level,
  updateQuests,
  updateUserData,
}) {
  
  return (
    <article className="quest-container">
      <div className="quest-container-bottom">
        <div className="quest-header">
          <div className="quest-header-text">
            <h2>This is a title</h2>
            <p>This is a description</p>
          </div>
          <QuestCompleteButton
            thisQuestId={0}
            exp={0}
            
          />
        </div>

      
          <div className="quest-options">
            {/* Replace the <a> tag with a button to open the modal */}
            <button>View Full Quest</button>
            <EditQuest thisQuestId={0} updateQuests={0} title={0} description={0} />
          </div>
     
      </div>

      {/* Modal to show the FullQuest component */}
      <Modal >
        <FullQuest
          Quest={{ title, description, level, exp }}
          id={0}
          updateQuests={0}
        />
      </Modal>
    </article>
  );
}

export default Quest;
