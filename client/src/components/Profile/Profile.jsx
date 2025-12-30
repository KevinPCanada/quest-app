import React, { useState, useEffect, useContext } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { AuthContext } from "../../context/AuthContext";
import { apiRequest } from "../../lib/apiRequest"; // Import helper

// Helper for Image URLs so they work on Vercel AND Localhost
const SERVER_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:8800" 
  : ""; 

function ProfileButton() {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        // 1. Fetch User Data
        const userDataResponse = await apiRequest(`/user/${currentUser.user_id}`, "GET");
        setUserData(userDataResponse);

        // 2. Fetch Class Data
        const classDataResponse = await apiRequest(`/user/${currentUser.user_id}/class`, "GET");
        setClassData(classDataResponse);

      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData || !classData) {
    return <div>No user data available</div>;
  }

  const level = Math.floor(userData.experience / 100) + 1;
  const expToNextLevel = userData.experience % 100;
  
  // UPDATED: Use SERVER_URL to ensure this works in production
  const avatarUrl = classData.class_avatar;
  
  const displayName = userData.display_name || userData.username;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="profile-avatar flex items-center justify-start bg-transparent hover:bg-transparent active:bg-transparent focus:ring-0 focus:ring-offset-0 px-0 font-thin">
          <Avatar className="h-10 w-10 mr-2">
            <AvatarImage src={avatarUrl} alt={classData.class_name} />
            <AvatarFallback>{displayName[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-xl hide-1024">{displayName}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 rounded-none">
        <Card className="shadow-none rounded-none">
          <CardHeader>
            <CardTitle className="text-2xl font-light font-pixelify">
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={avatarUrl} alt={classData.class_name} />
                <AvatarFallback>{classData.class_name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold">{displayName}</h2>
                <p className="text-sm text-muted-foreground">
                  {classData.class_name}
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