import React from 'react';
import QuestCompleteButton from '../QuestCompleteButton/QuestCompleteButton';
import EditQuest from '../EditQuest/EditQuest';
import './Quest.css';

function Quest({ title, description, exp }) {
  
  return (
    <article className="quest-container">
      <div className="quest-container-bottom">
        <h2>{title}</h2>
        <div className="quest-container-left">
          <p>{description}</p>
          <div className="quest-options">
            <a href="">View Full Quest</a>
            <EditQuest/>
          </div>
        </div>
      </div>
      <div className="quest-container-right">
        <QuestCompleteButton exp={exp} />
      </div>
    </article>
  );
}

export default Quest;