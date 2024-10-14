import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { editQuest } from "./EditQuestControllers"; // Assuming this function sends the update request to your backend
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";

export default function EditQuest({ thisQuestId, updateQuests, description, title }) {
    const [open, setOpen] = useState(false);
    const [questLevel, setQuestLevel] = useState("1");
//takes all of the data from the form and puts it into one object
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const questData = {
            questId: thisQuestId,
            questName: e.target.questName.value,
            questDescription: e.target.questDescription.value,
            questLevel: questLevel,
        };
//sends the form data to the backend for an SQL request
        try {
            await editQuest(questData);
            updateQuests();
            //confirms that the quest was successfully edited
            console.log("Quest updated successfully");
            setOpen(false); // Close the dialog after submission
        } catch (error) {
            console.error("Failed to edit quest:", error);
        }
    };

  
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    
                    className="questboard-header-button font-pixelify bg-secondary-color text-base text-text-color px-3 py-1 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-button-hover active:shadow-none active:translate-y-[3px] flex items-center gap-2 rounded-none font-thin"
                >
                    <span className="hide">Edit</span>
                    <i className="material-icons hide-full">edit_note</i>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] !rounded-none">
                <DialogHeader>
                    <DialogTitle className="font-pixelify font-thin text-xl">
                        Edit Quest
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="questName">Quest Name</Label>
                        <Input
                            id="questName"
                            defaultValue={title}
                            className="font-pixelify"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="questDescription">Quest Description</Label>
                        <Textarea
                            className="font-pixelify resize-none"
                            id="questDescription"
                            defaultValue={description}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="font-pixelify font-thin">Level</Label>
                        <RadioGroup
                            defaultValue="1"
                            onValueChange={setQuestLevel}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="1" id="easy" />
                                <Label htmlFor="easy">Trivial</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="2" id="medium" />
                                <Label htmlFor="medium">Challenging</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="3" id="hard" />
                                <Label htmlFor="hard">Deadly</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <Button
                        type="submit"
                        className="font-pixelify font-thin questboard-header-button bg-secondary-color text-base text-text-color h-[50px] px-3 py-1 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-button-hover active:shadow-none active:translate-y-[3px] flex items-center w-full gap-2 rounded-none"
                    >
                        Edit
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}