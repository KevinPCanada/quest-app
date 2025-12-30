import { apiRequest } from "../../lib/apiRequest";
export const editQuest = async (questData) => {
    try {
        return await apiRequest("/quests/modify-quest", "PUT", questData);
    } catch (error) {
        console.error("Failed to modify quest, please try again", error);
        throw error;
    }
};