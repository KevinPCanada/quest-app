import { apiRequest } from "../../../lib/apiRequest"; 
// ^ Adjust this import path to where your apiRequest helper is! 
// If you don't use apiRequest, use the fetch version below.

// OPTION 1: If you have your global apiRequest helper (Recommended)
export const addQuest = async (questData) => {
  // apiRequest automatically handles JSON headers and credentials
  const response = await apiRequest("/quests/add-quest", "POST", questData);
  return response;
};