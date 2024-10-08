// utils/levelCalculations.js

// Calculate level based on experience
export const calculateLevel = (experience) => {
  return Math.floor(experience / 100) + 1;
};

// Calculate experience required for a given level
export const calculateExperienceForLevel = (level) => {
  return (level - 1) * 100;
};

// Calculate experience needed to reach the next level
export const experienceToNextLevel = (currentExperience) => {
  const currentLevel = calculateLevel(currentExperience);
  return calculateExperienceForLevel(currentLevel + 1) - currentExperience;
};

// Check if the user has leveled up
export const hasLeveledUp = (oldExperience, newExperience) => {
  return calculateLevel(newExperience) > calculateLevel(oldExperience);
};

// Calculate the progress towards the next level (as a percentage)
export const levelProgress = (experience) => {
  const currentLevel = calculateLevel(experience);
  const expForCurrentLevel = calculateExperienceForLevel(currentLevel);
  const expForNextLevel = calculateExperienceForLevel(currentLevel + 1);
  return ((experience - expForCurrentLevel) / (expForNextLevel - expForCurrentLevel)) * 100;
};