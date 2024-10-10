export const deleteAllCompleted = async (questData) => {

    console.log(questData)

    try {
        const response = await fetch("http://localhost:8800/api/quests/delete-all", {
            method: "DELETE",
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