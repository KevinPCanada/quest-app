import React, { useState, useEffect, useCallback } from "react";
import './Full_Quest.css';
import '../../../public/css/base.css'
import skullImage from '../../assets/img/skull.png';
import swordImage from '../../assets/img/sword.png';
import cakeImage from '../../assets/img/pieceofcake.png';
import { deleteQuest } from "./full-quest-controller";
import QuestCompleteButton from '../QuestCompleteButton/QuestCompleteButton';
import EditQuest from "../EditQuest/EditQuest";



export default function FullQuest({ Quest, updateQuests, id, exp, updateUserData, handleCloseModal }) {
    console.log(handleCloseModal)

    const [levelDetails, setLevelDetails] = useState({ className: '', image: '' });

    useEffect(() => {
        const getLevelDetails = (level) => {
            switch (level) {
                case 'deadly':
                    return { className: 'level-deadly', image: skullImage };
                case 'challenging':
                    return { className: 'level-challenging', image: swordImage };
                case 'trivial':
                    return { className: 'level-trivial', image: cakeImage };
                default:
                    return { className: '', image: '' };
            }
        };

        if (typeof Quest.level === 'string') {
            setLevelDetails(getLevelDetails(Quest.level));
        } else {
            console.error("Quest.level is not a string:", Quest.level);
            setLevelDetails({ className: '', image: '' });
        }
    }, [Quest.level]);


    const handleComplete = () => {
        alert(`Quest "${Quest.title}" has been completed!`);
    };

    const handleModify = () => {
        alert(`Modify the quest: "${Quest.title}".`);
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

    const handleDelete = () => {
        const confirmDelete = window.confirm(`Are you sure you want to delete the quest: "${Quest.title}"?`);
        deleteQuest(id)
        if (confirmDelete) {
            alert(`Quest "${Quest.title}" has been deleted.`);
        }
        updateQuests()
    };

    return (
        <div className="full-quest-container">
            <div className="full-quest-section">
                <div className="FullQuestTitleContainer">
                    <p className="QuestTitle">
                        <span className="QuestLabel">Quest:</span>
                        <span className="Questname">{Quest.title}</span>
                        {levelDetails.image && (
                            <img src={levelDetails.image} alt={Quest.level} className="QuestLevelImage" />
                        )}
                    </p>
                </div>
                <p className="Questdescription">{Quest.description}</p>
                <p className="Questlevel">
                    <strong>Level: </strong>
                    <span className={`QuestLevelText ${levelDetails.className}`}>{Quest.level}</span>
                </p>

                <div className="full-quest-buttons">
                    <div className="full-quest-complete section">
                        <QuestCompleteButton
                            thisQuestId={id}
                            exp={exp}
                            onQuestComplete={handleQuestComplete}
                            onClick={handleComplete} 
                            className="full-quest-specific-button full-quest-button complete">Complete
                        </QuestCompleteButton>
                    </div>
                    
                    <div className="second-third-buttons">
                        <EditQuest 
                            className="full-quest-button edit" thisQuestId={id} updateQuests={updateQuests}>
                        </EditQuest>
                        <button onClick={handleDelete} className="full-quest-button delete">Delete</button>
                    </div>
                </div>
            </div>
        </div >
    );
}





// export default function FullQuest({ Quest }) {
//     return (
//         <>
//             <section className="full-quest-section">
//                 <div className="FullQuestTitleContainer">
//                 <p className="Questname"><strong>Quest:   </strong>{Quest.name}</p>
//                 </div>
//                 {/* <p className="Questname">{Quest.name}</p> */}
//                 <p className="Questdescription">{Quest.description}</p>
//                 <p className="Questlevel"><strong>Level:</strong> {Quest.questLevel}</p>

//                 <div className="full-quest-buttons">

//                     <button buttonLabel='Complete Quest' className="full-quest-button complete"> Complete</button>
//                     <button buttonLabel="Modify Quest"  className="full-quest-button modify"> Modify</button>
//                     <button buttonLabel="Delete Quest" className="full-quest-button delete"> Delete</button>

//                     {/* <FullQuestButton buttonLabel='Complete Quest' className="full-quest-button complete" ></FullQuestButton>
//                     <FullQuestButton buttonLabel="Modify Quest"  className="full-quest-button modify" ></FullQuestButton>

//                     <FullQuestButton buttonLabel="Modify Quest" className="full-quest-button modify" />
//                     <FullQuestButton buttonLabel="Delete Quest" className="full-quest-button delete" /> */}
//                 </div>
//             </section>
//         </>
//     );
// }



// export default function FullQuest({ Quest }) {
//     return (
//         <section className="full-quest-section full-page">
//             <div className="FullQuestTitleContainer">
//                 <p className="Questname"><strong>Quest: </strong>{Quest.name}</p>
//             </div>
//             <p className="Questdescription">{Quest.description}</p>
//             <p className="Questlevel"><strong>Level:</strong> {Quest.questLevel}</p>

//             <div className="full-quest-buttons">
//                 <button className="full-quest-button complete">Complete</button>
//                 <button className="full-quest-button modify">Modify</button>
//                 <button className="full-quest-button delete">Delete</button>
//             </div>
//         </section>
//     );
// }
