import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Trophy } from "lucide-react";

export default function LevelUpCard({ newLevel, onClose }) {
  useEffect(() => {
    console.log("LevelUpCard rendered. newLevel:", newLevel);
    console.log("Triggering confetti");
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, [newLevel]);

  const handleClose = () => {
    console.log("LevelUpCard close button clicked");
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]"
    >
      <Card className="w-[350px] bg-gradient-to-br from-yellow-300 to-yellow-500 text-yellow-900">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Level Up!</CardTitle>
          <CardDescription className="text-xl text-yellow-800 text-center">
            Congratulations, Adventurer!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Trophy className="w-24 h-24 text-yellow-900" />
          <p className="text-2xl font-bold">You've reached level {newLevel}!</p>
          <Button
            onClick={handleClose}
            className="bg-yellow-900 text-yellow-100 hover:bg-yellow-800"
          >
            Continue Your Quest
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}