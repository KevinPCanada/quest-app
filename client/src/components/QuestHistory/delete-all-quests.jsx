import React, { useState, useEffect, useCallback } from "react";
import { deleteAllCompleted } from "./delete-all-controller";

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
      <div className="relative">
        <button className="quest-delete-button" onClick={handleClick}>
          <span className="hide">Delete All Quests</span>
          <i className="material-icons">done_outline</i>
        </button>
      </div>
    );
  }