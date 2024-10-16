import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { addQuest } from "./NewQuestControllers/quest-controllers";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import "./NewQuest.css"

export default function NewQuest({updateQuests}) {
    const [open, setOpen] = React.useState(false);
    const [questLevel, setQuestLevel] = useState("1")

    const handleSubmit = async (e) => {

        e.preventDefault();

        const questData = {
            questName: e.target.questName.value,
            questDescription: e.target.questDescription.value,
            questLevel: questLevel
        }

        

        const addedQuest = await addQuest(questData)


        
        console.log("Form submitted");
        updateQuests()
        setOpen(false);
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {/* New Quest Button */}
                <Button
                    variant="outline"
                    className="questboard-header-button font-pixelify bg-secondary-color text-base text-text-color h-[50px] px-3 py-1 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-button-hover active:shadow-none active:translate-y-[3px] flex items-center gap-2 rounded-none font-thin"
                >
                    <i className="material-icons">edit</i>
                    New Quest
                </Button>
            </DialogTrigger>
            <DialogContent className="newquest-popup sm:max-w-[425px] !rounded-none">
                <DialogHeader>
                    <DialogTitle className="font-pixelify font-thin text-xl">New Quest</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 ">
                    <div className="space-y-2">
                        <Label htmlFor="questName" >Quest Name</Label>
                        <Input id="questName" placeholder="Enter quest name"   />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="questDescription">Quest Description</Label>
                        <Textarea
                            className="resize-none"
                            id="questDescription"
                            placeholder="Describe your quest"
                            
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="font-pixelify font-thin"> Level</Label>
                        <RadioGroup defaultValue="1" onValueChange={setQuestLevel}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="1" id="easy" />
                                <Label htmlFor="easy">Trivial + 10xp</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="2" id="medium" />
                                <Label htmlFor="medium">Challenging + 25xp</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="3" id="hard" />
                                <Label htmlFor="hard">Deadly +50xp</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <Button type="submit" className="font-pixelify font-thin questboard-header-button bg-secondary-color text-base text-text-color h-[50px] px-3 py-1 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-button-hover active:shadow-none active:translate-y-[3px] flex items-center gap-2 rounded-none w-full ">Add Quest</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}