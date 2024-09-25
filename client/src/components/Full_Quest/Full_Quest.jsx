import React from "react";
import FullQuestButton from "./FullQuestButton";
import './Full_Quest.css'

//Right now, you can call the component with this tag
{/* <FullQuest Quest={{name:'Do homework', description:'Javascript homework for w-coding', questLevel:'Challenging'}}></FullQuest> */ }
//As we integrate the database, we can change this, but for testing purposes, this works to insert the details into the component

export default function FullQuest({ Quest }) {
    return (
        <>
            <section className="full-quest-section">
                <div className="FullQuestTitleContainer"> 
                <p className="Questname">{Quest.name}</p>
                </div>
                {/* <p className="Questname">{Quest.name}</p> */}
                <p className="Questdescription">{Quest.description}</p>
                <p className="Questlevel"><strong>Level:</strong> {Quest.questLevel}</p>

                <div className="full-quest-buttons">

                    <button buttonLabel='Complete Quest' className="full-quest-button complete"> Complete</button>
                    <button buttonLabel="Modify Quest"  className="full-quest-button modify"> Modify</button>
                    <button buttonLabel="Delete Quest" className="full-quest-button delete"> Delete</button>

                    {/* <FullQuestButton buttonLabel='Complete Quest' className="full-quest-button complete" ></FullQuestButton>
                    <FullQuestButton buttonLabel="Modify Quest"  className="full-quest-button modify" ></FullQuestButton>

                    <FullQuestButton buttonLabel="Modify Quest" className="full-quest-button modify" />
                    <FullQuestButton buttonLabel="Delete Quest" className="full-quest-button delete" /> */}
                </div>
            </section>
        </>
    );
}