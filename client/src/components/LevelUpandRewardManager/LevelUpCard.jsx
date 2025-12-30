import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Sword } from "lucide-react";
import levelUpSound from "../../assets/sfx/level-up-sound.mp3"; // Import your audio file

export default function LevelUpCard({ newLevel, onClose, onOpenRewardSelector, milestoneReached }) {
  const [audio] = useState(new Audio(levelUpSound)); // Initialize the audio in the state

  useEffect(() => {
    console.log("LevelUpCard rendered. newLevel:", newLevel, "milestoneReached:", milestoneReached);
    console.log("Triggering confetti");
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Play the audio
    audio.volume = 0.3; // Set the volume to 30%
    audio.currentTime = 0; // Reset the audio to start at the beginning
    audio.play(); // Play the audio
  }, [newLevel, audio, milestoneReached]);

  const handleClose = () => {
    console.log("LevelUpCard close button clicked");
    onClose();
  };

  const handleSelectReward = () => {
    console.log("Select Reward button clicked");
    onOpenRewardSelector();
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none"
    >
      <Card className="w-[350px] bg-white border-4 border-black text-black pointer-events-auto font-pixelify shadow-2xl">
        <CardHeader className="border-b-4 border-black">
          <CardTitle className="text-4xl font-bold text-center pixel-text">
            LEVEL UP!
          </CardTitle>
          <CardDescription className="text-xl text-gray-700 text-center pixel-text">
            Congratulations, Adventurer!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6 pt-6 font-light">
          <div className="relative">
            <Sword className="w-24 h-24 text-black" />
          </div>
          <p className="text-3xl pixel-text">Level {newLevel}</p>
          <Button
            onClick={handleClose}
            className="bg-black text-white hover:bg-gray-800 border-2 border-white pixel-text"
          >
            Continue Journey
          </Button>
          {milestoneReached && (
            <Button
              onClick={handleSelectReward}
              className="bg-[var(--primary-color)] text-white hover:bg-gray-800 border-2 border-white pixel-text"
            >
              Select Reward
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>,
    document.body // <--- 3. THIS TELLS REACT TO RENDER IT AT THE END OF THE BODY
  );
}