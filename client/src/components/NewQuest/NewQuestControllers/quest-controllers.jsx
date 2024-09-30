import { useState, useEffect } from "react";

export const addQuest = async (questData) => {
    try {
        const response = await fetch("http://localhost:8800/api/quests/add-quest", {
            method: "POST",
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
        console.error("Failed to add quest, please try again", error);
        throw error;
    }
};