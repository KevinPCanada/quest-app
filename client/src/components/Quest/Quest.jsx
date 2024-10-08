import React, { useState, useCallback } from 'react';
import QuestCompleteButton from '../QuestCompleteButton/QuestCompleteButton';
import EditQuest from '../EditQuest/EditQuest';
import FullQuest from '../Full_Quest/Full_Quest';
import Modal from '../Modal/Modal';
import './Quest.css';

function Quest({ title, description, exp, id, level, updateQuests, updateUserData }) {
  // State to control the visibility of the modal
  // This allows us to show/hide the full quest details on user interaction
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handler to open the modal
  // We use a separate function for this to keep the JSX clean and allow for future expansion
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Handler to close the modal
  // Similar reasoning as handleOpenModal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handler for quest completion
  // We use useCallback here to optimize performance, preventing unnecessary re-renders
  // This is especially important as this function is passed as a prop to QuestCompleteButton
  const handleQuestComplete = useCallback(async () => {
    console.log("Quest complete callback triggered");
    // We update quests first to refresh the list of available quests
    await updateQuests();
    // Then update user data to reflect any changes (like XP gain or level up)
    await updateUserData();
    // Note: We might want to add error handling here in the future
  }, [updateQuests, updateUserData]);

  return (
    // We use an article tag for semantic HTML, as each quest is a self-contained piece of content
    <article className="quest-container">
      <div className="quest-container-bottom">
        <h2>{title}</h2>
        <div className="quest-container-left">
          <p>{description}</p>
          <div className="quest-options">
            <button onClick={handleOpenModal}>
              <span className="hide">View Full Quest</span>
              <i className="material-icons hide-full">search</i>
            </button>
            <EditQuest thisQuestId={id} updateQuests={updateQuests} handleCloseModal={handleCloseModal} />
          </div>
        </div>
      </div>
      <div className="quest-container-right">
        {/* Button to mark the quest as complete */}
        <QuestCompleteButton
          thisQuestId={id}
          exp={exp}
          onQuestComplete={handleQuestComplete}
        />
      </div>
      {/* Modal for displaying full quest details */}
      {/* We use a separate Modal component for reusability and to keep this component clean */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <FullQuest 
          Quest={{title, description, level, exp}} 
          id={id} 
          updateQuests={updateQuests}
          handleCloseModal={handleCloseModal}
        />
      </Modal>
    </article>
  );
}

export default Quest;