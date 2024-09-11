import React from "react";

export default function NewQuestRadio({QuestLevel}) {
    return <>
    <p>{QuestLevel}</p>
    <input name='questLevel' type='radio'/>
    </>
}
