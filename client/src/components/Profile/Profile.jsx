import React, { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";

const classNames = ["Warrior", "Mage", "Rogue", "Priest"];
const classImages = [
  "/placeholder.svg?height=100&width=100",
  "/placeholder.svg?height=100&width=100",
  "/placeholder.svg?height=100&width=100",
  "/placeholder.svg?height=100&width=100",
];

function ProfileButton() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from local storage
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      try {
        const parsedUserData = JSON.parse(userDataString);
        setUserData(parsedUserData);
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    }
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const level = Math.floor(userData.experience / 100) + 1;
  const expToNextLevel = userData.experience % 100;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="profile-avatar flex items-center justify-start bg-transparent hover:bg-transparent active:bg-transparent focus:ring-0 focus:ring-offset-0 px-0 font-thin"
        >
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>{userData.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-xl hide">{userData.username}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 rounded-none">
        <Card className="shadow-none rounded-none">
          <CardHeader>
            <CardTitle className="text-2xl font-light font-pixelify">Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={classImages[userData.class_id - 1]}
                  alt={classNames[userData.class_id - 1]}
                />
                <AvatarFallback>
                  {classNames[userData.class_id - 1][0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold">
                  {userData.display_name || userData.username}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {classNames[userData.class_id - 1]}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Level:</span>
                <span>{level}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Experience:</span>
                <span>{userData.experience} XP</span>
              </div>
              <Progress value={expToNextLevel} className="w-full h-2" />
              <p className="text-xs text-muted-foreground text-right">
                {expToNextLevel}/100 XP to next level
              </p>
            </div>
            <div className="text-sm">
              <span className="font-medium">Email: </span>
              <span>{userData.email}</span>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}

export default ProfileButton;