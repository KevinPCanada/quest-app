import { useState, useEffect } from "react";

export const deleteQuest = async (questId) => {
    try {
        const response = await fetch(`http://localhost:8800/api/quests/add-quest/${questId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(questId),
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