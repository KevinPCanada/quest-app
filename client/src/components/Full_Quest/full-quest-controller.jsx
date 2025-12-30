import { apiRequest } from "../../lib/apiRequest"; // Adjust path if needed

export const deleteQuest = async (id) => {
    try {
        return await apiRequest(`/quests/delete-quest/${id}`, "DELETE");
    } catch (error) {
        console.error("Failed to delete quest, please try again", error);
        throw error;
    }
};