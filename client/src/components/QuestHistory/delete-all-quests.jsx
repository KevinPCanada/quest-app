import React, { useState, useEffect, useCallback } from "react";
import { deleteAllCompleted } from "./delete-all-controller";
import "./delete-all-quests.css"

export function DeleteAllButton({ fetchCompletedQuests }) {
    const handleClick = async (e) => {
      e.preventDefault();
  
      try {
        await deleteAllCompleted();
        console.log("Quests Successfully Deleted");
        // Fetch the updated list of quests
        await fetchCompletedQuests();
      } catch (error) {
        console.error("Failed to delete quests:", error);
      }
    };
  
    return (
      <div>
        <button className="quest-delete-button" onClick={handleClick}>
          <span>Delete All Quests</span>
        </button>
      </div>
    );
  }