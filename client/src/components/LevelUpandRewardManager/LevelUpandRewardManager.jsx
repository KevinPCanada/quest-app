import React, { useState } from 'react';
import LevelUpCard from './LevelUpCard';
import RewardSelector from './RewardSelector';

export default function LevelUpandRewardManager({ newLevel, onClose }) {
  const [showLevelUp, setShowLevelUp] = useState(true);
  const [showRewardSelector, setShowRewardSelector] = useState(false);

  const handleLevelUpClose = () => {
    console.log("LevelUpCard closed");
    setShowLevelUp(false);
    onClose();
  };

  const handleOpenRewardSelector = () => {
    console.log("Opening RewardSelector");
    setShowLevelUp(false);
    setShowRewardSelector(true);
  };

  const handleRewardSelectorClose = () => {
    console.log("RewardSelector closed");
    setShowRewardSelector(false);
    onClose();
  };

  console.log("Rendering LevelUpandRewardManager. showLevelUp:", showLevelUp, "showRewardSelector:", showRewardSelector);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {showLevelUp && (
        <LevelUpCard
          newLevel={newLevel}
          onClose={handleLevelUpClose}
          onOpenRewardSelector={handleOpenRewardSelector}
        />
      )}
      {showRewardSelector && (
        <RewardSelector
          onClose={handleRewardSelectorClose}
        />
      )}
    </div>
  );
}