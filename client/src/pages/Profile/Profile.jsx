import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Progress } from "../../components/ui/progress";

const classNames = ["Warrior", "Mage", "Rogue", "Priest"];
const classImages = [
  "/placeholder.svg?height=100&width=100",
  "/placeholder.svg?height=100&width=100",
  "/placeholder.svg?height=100&width=100",
  "/placeholder.svg?height=100&width=100",
];

function ProfilePage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const level = Math.floor(userData.experience / 100) + 1;
  const expToNextLevel = userData.experience % 100;

  return (
    <div className="min-h-screen flex flex-col bg-background p-4">
      <Card className="flex-grow flex flex-col max-w-4xl w-full mx-auto border-none shadow-none">
        <CardHeader className="flex-shrink-0 pb-8">
          <CardTitle className="text-4xl font-pixelify text-center">
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between space-y-8 p-8">
          <div className="flex items-center justify-center space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={classImages[userData.class_id - 1]}
                alt={classNames[userData.class_id - 1]}
              />
              <AvatarFallback>
                {classNames[userData.class_id - 1][0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-4xl font-semibold font-pixelify">
                {userData.display_name || userData.username}
              </h2>
              <p className="text-xl text-muted-foreground">
                {classNames[userData.class_id - 1]}
              </p>
            </div>
          </div>
          
          <div className="space-y-4 flex-grow flex flex-col justify-center">
            <div className="flex justify-between text-lg">
              <span className="font-medium text-3xl font-pixelify">Level:</span>
              <span className="text-3xl">{level}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span className="font-medium font-pixelify text-xl">Total Experience:</span>
              <span>{userData.experience} XP</span>
            </div>
            <Progress value={expToNextLevel} className="w-full h-4" />
            <p className="text-sm text-muted-foreground text-right">
              {expToNextLevel}/100 XP to next level
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between text-lg">
              <span className="font-medium font-pixelify">Email:</span>
              <span>{userData.email}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

}

export default ProfilePage;