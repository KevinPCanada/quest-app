import { apiRequest } from "../../lib/apiRequest"; // Adjust path if needed

export const deleteAllCompleted = async (questData) => {
    try {
        return await apiRequest("/quests/delete-all", "DELETE", questData);
    } catch (error) {
        console.error("Failed to delete quests, please try again", error);
        throw error;
    }
};