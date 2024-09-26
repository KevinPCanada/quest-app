import React from "react";
import FullQuestButton from "./FullQuestButton";
import './Full_Quest.css'

//Right now, you can call the component with this tag
{/* <FullQuest Quest={{name:'Do homework', description:'Javascript homework for w-coding', questLevel:'Challenging'}}></FullQuest> */}
//As we integrate the database, we can change this, but for testing purposes, this works to insert the details into the component

export default function FullQuest({ Quest }) {
    return (
        <>
            <section className="full-quest-section">
                <h1>{Quest.name}</h1>
                <p>{Quest.description}</p>
                <p>{Quest.questLevel}</p>

                <div className="full-quest-buttons">
                    <FullQuestButton buttonLabel="Complete Quest" className="full-quest-button complete" />
                    <FullQuestButton buttonLabel="Modify Quest" className="full-quest-button modify" />
                    <FullQuestButton buttonLabel="Delete Quest" className="full-quest-button delete" />
                </div>
            </section>
        </>
    );
}


import React from "react";
import FullQuestButton from "./FullQuestButton";

//Right now, you can call the component with this tag
// <FullQuest Quest={{name:'Do homework', description:'Javascript homework for w-coding', questLevel:'Challenging'}}></FullQuest>
//As we integrate the database, we can change this, but for testing purposes, this works to insert the details into the component

export default function FullQuest({Quest}) {

    return <>

        <section>
            <h1>
                {Quest.name}
            </h1>
            <p>
                {Quest.description}
            </p>

            <p>
                {Quest.questLevel}
            </p>

            <FullQuestButton buttonLabel='Complete Quest'></FullQuestButton>
            <FullQuestButton buttonLabel='Modify Quest'></FullQuestButton>
            <FullQuestButton buttonLabel='Delete Quest'></FullQuestButton>
        </section>
    </>
}