import React, { useState, useCallback } from 'react';
import QuestCompleteButton from '../QuestCompleteButton/QuestCompleteButton';
import EditQuest from '../EditQuest/EditQuest';
import FullQuest from '../Full_Quest/Full_Quest';
import Modal from '../Modal/Modal';
import './Quest.css';

function Quest({ title, description, exp, id, level, updateQuests, updateUserData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleQuestComplete = useCallback(async () => {
    console.log("Quest complete callback triggered");
    await updateQuests();
    await updateUserData();
  }, [updateQuests, updateUserData]);

  return (
    <article className="quest-container">
      <div className="quest-container-bottom">
        <h2>{title}</h2>
        <div className="quest-container-left">
          <p>{description}</p>
          <div className="quest-options">
            <button onClick={handleOpenModal}>View Full Quest</button>
            <EditQuest thisQuestId={id} updateQuests={updateQuests} />
          </div>
        </div>
      </div>
      <div className="quest-container-right">
        <QuestCompleteButton
          thisQuestId={id}
          exp={exp}
          onQuestComplete={handleQuestComplete}
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <FullQuest Quest={{title, description, level}} id={id} updateQuests={updateQuests}/>
      </Modal>
    </article>
  );
}

export default Quest;