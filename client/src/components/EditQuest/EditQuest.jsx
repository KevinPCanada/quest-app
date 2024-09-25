import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";

export default function NewQuest() {
    const [open, setOpen] = React.useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted");
        setOpen(false);
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {/* New Quest Button */}
                <Button
                    variant="outline"
                    className="questboard-header-button font-pixelify bg-secondary-color text-base text-text-color px-3 py-1 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-button-hover active:shadow-none active:translate-y-[3px] flex items-center gap-2 rounded-none font-thin"
                >
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] !rounded-none">
                <DialogHeader>
                    <DialogTitle className="font-pixelify font-thin text-xl">Edit Quest</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 ">
                    <div className="space-y-2">
                        <Label htmlFor="questName">Quest Name</Label>
                        <Input id="questName" placeholder="Enter quest name" className="font-pixelify" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="questDescription">Quest Description</Label>
                        <Textarea
                            className="font-pixelify resize-none"
                            id="questDescription"
                            placeholder="Describe your quest"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="font-pixelify font-thin"> Level</Label>
                        <RadioGroup defaultValue="easy">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="easy" id="easy" />
                                <Label htmlFor="easy">Trivial</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="medium" id="medium" />
                                <Label htmlFor="medium">Challenging</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="hard" id="hard" />
                                <Label htmlFor="hard">Deadly</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <Button type="submit" className="font-pixelify font-thin questboard-header-button bg-secondary-color text-base text-text-color h-[50px] px-3 py-1 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-button-hover active:shadow-none active:translate-y-[3px] flex items-center gap-2 rounded-none">Edit</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}