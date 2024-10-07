import React from "react";
import { Button } from "../ui/button";
import { useToast } from "../../hooks/use-toast";

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
        className="flex-none font-pixelify font-thin text-base rounded-none border-2 border-black bg-[var(--text-color-light)] text-[var(--background-color)] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-[var(--text-color-light)] hover:text-[var(--background-color)] active:shadow-none active:translate-y-[3px] active:translate-x-[3px] w-40 "
      >
        Set Milestone
      </Button>
    </>
  );
}
