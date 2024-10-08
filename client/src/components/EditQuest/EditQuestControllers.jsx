//sends the modify  quest request tot eh backend, with all of the quest data

export const editQuest = async (questData) => {

    console.log(questData)

    try {
        const response = await fetch("http://localhost:8800/api/quests/modify-quest", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(questData),
        });

        if (!response.ok) {
            throw new Error("Failed to add quest");
        }


        return await response.json(); 
    } catch (error) {
        console.error("Failed to modify quest, please try again", error);
        throw error;
    }
};