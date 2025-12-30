// Calculate the new milestone progress
export const calculateNewMilestoneProgress = (currentProgress, milestone, leveledUp) => {
  if (leveledUp) {
    // Increment progress by 1 when leveled up
    return (currentProgress + 1) % parseInt(milestone);
  }
  return currentProgress; // If not leveled up, progress stays the same
};
// Check if a milestone has been reached
export const isMilestoneReached = (milestoneProgress, leveledUp) => {
  return milestoneProgress === 0 && leveledUp;
};

// Calculate remaining progress to next milestone
export const calculateRemainingProgress = (currentProgress, milestone) => {
  return parseInt(milestone) - currentProgress;
};