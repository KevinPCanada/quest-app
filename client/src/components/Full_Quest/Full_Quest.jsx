import React from "react";
import './Full_Quest.css';

import skullImage from '../../assets/img/skull.png';
import swordImage from '../../assets/img/sword.png';
import cakeImage from '../../assets/img/pieceofcake.jpg';

export default function FullQuest({ Quest }) {


    const handleComplete = () => {
        alert(`Quest "${Quest.title}" has been completed!`);
    };

    const handleModify = () => {
        alert(`Modify the quest: "${Quest.title}".`);
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm(`Are you sure you want to delete the quest: "${Quest.title}"?`);
        if (confirmDelete) {
            alert(`Quest "${Quest.title}" has been deleted.`);
        }
    };

    const getLevelDetails = (level) => {
        switch (level.toLowerCase()) {
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

    const levelDetails = getLevelDetails(Quest.Level);

    return (
        <div className="full-quest-container">
            <div className="full-quest-section">
                <div className="FullQuestTitleContainer">
                    <p className="QuestTitle">
                        <span className="QuestLabel">Quest:</span>
                        <span className="Questname">{Quest.title}</span>
                        <img src={levelDetails.image} alt={Quest.Level} className="QuestLevelImage" />
                    </p>
                </div>
                <p className="Questdescription">{Quest.description}</p>
                <p className={`Questlevel`}>
                    <strong>Level: </strong>
                    <span className={`QuestLevelText ${levelDetails.className}`}>{Quest.level}</span>
                </p>

                <div className="full-quest-buttons">
                    <button onClick={handleComplete} className="full-quest-button complete">Complete</button>
                    <button onClick={handleModify} className="full-quest-button modify">Modify</button>
                    <button onClick={handleDelete} className="full-quest-button delete">Delete</button>
                </div>
            </div>
        </div>
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
