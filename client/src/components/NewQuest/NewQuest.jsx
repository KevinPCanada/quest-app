import React from "react";
import NewQuestRadio from "./NewQuestRadio";

export default function NewQuest() {
    return <>
        <h1>New Quest</h1>
        <form>
            <p>Quest Name</p>
            <input type='text'/>

            <p>Quest Description</p>
            <input type='text'/>
            <div>
            <p>Quest Level</p>
            <NewQuestRadio QuestLevel='Trivial'></NewQuestRadio>
            <NewQuestRadio QuestLevel='Challenging'></NewQuestRadio>
            <NewQuestRadio QuestLevel='Deadly'></NewQuestRadio>
            </div>
            <input type='submit' value='Submit' />
        </form>
    </>
}
