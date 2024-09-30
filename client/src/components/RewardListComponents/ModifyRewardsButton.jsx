import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function ModifyRewardButton({ reward, onModify }) {
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState(reward);

  const handleSubmit = (e) => {
    e.preventDefault();
    onModify(newName);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="font-pixelify bg-[var(--button-light)] hover:bg-[var(--button-light-hover)] text-[var(--text-color)] rounded-none border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[3px] transition-none"
        >
          Modify
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-none ">
        <DialogHeader>
          <DialogTitle className="font-pixelify font-thin">Edit Reward</DialogTitle>
          <DialogDescription>
            Make changes to the reward here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Reward Name
              </Label>
              <Input
                id="name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="col-span-3"
                autoComplete="off"  
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="font-pixelify font-thin text-base text-[var(--background-color)] bg-[var(--text-color-light)] h-[50px] px-3 py-1 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[3px] flex items-center gap-2 rounded-none transition-none">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}