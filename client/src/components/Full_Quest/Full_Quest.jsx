import React, { useState, useCallback } from 'react';
import { Skull, Swords, Cake, CheckCircle, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "../ui/alert-dialog";

import QuestCompleteButton from '../QuestCompleteButton/QuestCompleteButton';
import { deleteQuest } from "./full-quest-controller";
import EditQuest from "../EditQuest/EditQuest";

export default function FullQuest({ Quest, updateQuests, id, exp, updateUserData }) {
    const [isQuestDialogOpen, setIsQuestDialogOpen] = useState(false);
    
    // --- HELPERS ---
    const getLevelIcon = (level) => {
        switch (level) {
            case 'deadly': return <Skull className="h-4 w-4" />;
            case 'challenging': return <Swords className="h-4 w-4" />;
            case 'trivial': return <Cake className="h-4 w-4" />;
            default: return null;
        }
    };

    // UPDATED: Now returns Text colors instead of Background colors
    // I used '600' weight (e.g. text-red-600) so it is easier to read on a white background
    const getLevelColor = (level) => {
        switch (level) {
            case 'deadly': return 'text-red-600';
            case 'challenging': return 'text-yellow-600';
            case 'trivial': return 'text-green-600';
            default: return 'text-gray-600';
        }
    };

    // --- HANDLERS ---
    const handleRefreshData = useCallback(async () => {
        console.log("Refreshing data...");
        try {
            await updateQuests();
            await updateUserData();
            setIsQuestDialogOpen(false); 
        } catch (error) {
            console.error("Error refreshing data:", error);
        }
    }, [updateQuests, updateUserData]);

    const onConfirmDelete = async () => {
        await deleteQuest(id);
        await updateQuests();
        setIsQuestDialogOpen(false); 
    };

    return (
        <Dialog open={isQuestDialogOpen} onOpenChange={setIsQuestDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="rounded-none">View Full Quest</Button>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[425px] !rounded-none">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 font-pixelify font-thin text-xl">
                        Quest Details
                    </DialogTitle>
                </DialogHeader>

                <Card className="w-full border-0 shadow-none">
                    <CardContent className="p-0">
                        <div className="grid grid-cols-[auto,1fr] gap-4 items-center mb-4">
                            
                            {/* Title Row */}
                            <div className="text-right text-sm text-muted-foreground font-pixelify font-thin">Title</div>
                            <div className="flex items-center justify-between">
                                <span className="font-medium">{Quest.title}</span>
                                
                                {/* UPDATED BADGE:
                                    - Removed 'text-white'
                                    - Added 'bg-transparent' and 'hover:bg-transparent'
                                    - Added 'p-0' (padding 0) so it sits tight like text
                                */}
                                <Badge 
                                    variant="secondary" 
                                    className={`${getLevelColor(Quest.level)} bg-transparent hover:bg-transparent p-0 ml-2 rounded-none shadow-none`}
                                >
                                    {getLevelIcon(Quest.level)}
                                    <span className="ml-1 capitalize">{Quest.level}</span>
                                </Badge>
                            </div>

                            {/* Description Row */}
                            <div className="text-right text-sm text-muted-foreground font-pixelify font-thin">Description</div>
                            <div className="text-sm">{Quest.description}</div>

                            {/* XP Row */}
                            <div className="text-right text-sm text-muted-foreground font-pixelify font-thin">XP</div>
                            <div className="text-sm font-bold text-blue-600">{exp || Quest.exp} XP</div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-3 p-0 mt-6 w-full">
                        
                        {/* ROW 1: Complete Button */}
                        <div className="w-full">
                            <QuestCompleteButton
                                thisQuestId={id}
                                exp={exp || Quest.exp}
                                onQuestComplete={handleRefreshData}
                                className="w-full font-pixelify font-thin bg-green-600 text-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-green-700 active:shadow-none active:translate-y-[3px] flex items-center justify-center gap-2 rounded-none px-4 py-2 h-auto"
                            >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Complete
                            </QuestCompleteButton>
                        </div>

                        {/* ROW 2: Edit & Delete Buttons */}
                        <div className="flex w-full gap-3">
                            <div className="flex-1 [&_button]:w-full">
                                <EditQuest thisQuestId={id} updateQuests={updateQuests} title={Quest.title} description={Quest.description} />
                            </div>

                            <div className="flex-1">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button 
                                            variant="destructive" 
                                            className="w-full rounded-none border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[3px] flex items-center justify-center h-full"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="rounded-none">
                                        <AlertDialogHeader>
                                            <AlertDialogTitle className="font-pixelify">Delete Quest?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to delete <strong>"{Quest.title}"</strong>? 
                                                This action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel className="rounded-none border-2 border-black">Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={onConfirmDelete} className="bg-red-600 hover:bg-red-700 rounded-none border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[3px]">
                                                Delete
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </DialogContent>
        </Dialog>
    );
}