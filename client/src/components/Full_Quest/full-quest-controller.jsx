export const deleteQuest = async (id) => {
    try {
        console.log(id);
        const response = await fetch(`http://localhost:8800/api/quests/delete-quest/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", 
        });

        if (!response.ok) {
            throw new Error("Failed to delete quest");
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to delete quest, please try again", error);
        throw error;
    }
};