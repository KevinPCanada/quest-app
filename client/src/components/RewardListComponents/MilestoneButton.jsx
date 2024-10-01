import React from "react";
import { Button } from "../ui/button";
import { useToast } from "../../hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { Toaster } from "../ui/toaster";

export default function MilestoneButton() {
  const { toast } = useToast();

  const handleSetMilestone = () => {
    // Add your milestone setting logic here
    console.log("Setting milestone...");

    // Show toast notification
    toast({
      title: "Milestone Set",
      description: "Your milestone has been successfully set.",
    });
  };

  return (
    <>
      <Button
        onClick={handleSetMilestone}
        className="flex-none font-pixelify bg-[var(--button-light)] hover:bg-[var(--button-light-hover)] text-[var(--text-color)] rounded-none border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[3px] transition-none"
      >
        Set Milestone
      </Button>
      <Toaster />
    </>
  );
}
