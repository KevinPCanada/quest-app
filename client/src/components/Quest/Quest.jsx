// import React from 'react';
// import QuestCompleteButton from '../QuestCompleteButton/QuestCompleteButton';
// import EditQuest from '../EditQuest/EditQuest';
// import FullQuest from '../Full_Quest/Full_Quest';
// import './Quest.css';

// function Quest({ title, description, exp }) {
  
//   return (
//     <article className="quest-container">
//       <div className="quest-container-bottom">
//         <h2>{title}</h2>
//         <div className="quest-container-left">
//           <p>{description}</p>
//           <div className="quest-options">
//             <a href="../fullquest">View Full Quest</a>
//             <EditQuest/>
//           </div>
//         </div>
//       </div>
//       <div className="quest-container-right">
//         <QuestCompleteButton exp={exp} />
//       </div>
//     </article>
//   );
// }

// export default Quest;


import React, { useState } from 'react';
import QuestCompleteButton from '../QuestCompleteButton/QuestCompleteButton';
import EditQuest from '../EditQuest/EditQuest';
import FullQuest from '../Full_Quest/Full_Quest';
import Modal from '../Modal/Modal';
import './Quest.css';


function Quest({ title, description, exp, id, level, updateQuests }) {
  
 
 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <article className="quest-container">
      <div className="quest-container-bottom">
        <h2>{title}</h2>
        <div className="quest-container-left">
          <p>{description}</p>
          <div className="quest-options">

            {/* Replace the <a> tag with a button to open the modal */}
            <button onClick={handleOpenModal}>View Full Quest</button>
            <EditQuest thisQuestId={id} updateQuests={updateQuests} />

          </div>
        </div>
      </div>
      <div className="quest-container-right">
        <QuestCompleteButton thisQuestId={id} exp={exp} updateQuests={updateQuests}/>
      </div>

      {/* Modal to show the FullQuest component */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <FullQuest Quest = {{title, description, level}} id={id} updateQuests={updateQuests}/>
        
      </Modal>
    </article>
    
  );
}

export default Quest;