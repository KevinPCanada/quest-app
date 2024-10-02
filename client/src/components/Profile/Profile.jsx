import React, { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";

function ProfileButton() {
  // State variables to store user data, class data, experience data, and any errors
  const [userData, setUserData] = useState(null);
  const [classData, setClassData] = useState(null);
  const [experienceData, setExperienceData] = useState(null);
  const [error, setError] = useState(null);

  // useEffect hook to fetch user, class, and experience data when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user data from local storage
        const userDataString = localStorage.getItem("user");
        if (!userDataString) {
          throw new Error("No user data found in local storage");
        }

        const parsedUserData = JSON.parse(userDataString);
        setUserData(parsedUserData);

        // Fetch class data from the server
        const classResponse = await fetch(
          `http://localhost:8800/api/user/${parsedUserData.user_id}/class`,
          {
            credentials: "include",
          }
        );

        if (!classResponse.ok) {
          throw new Error(`HTTP error! status: ${classResponse.status}`);
        }

        const classData = await classResponse.json();
        setClassData(classData);

        // Fetch experience data from the server
        const expResponse = await fetch(
          `http://localhost:8800/api/user/${parsedUserData.user_id}/exp`,
          {
            credentials: "include",
          }
        );

        if (!expResponse.ok) {
          throw new Error(`HTTP error! status: ${expResponse.status}`);
        }

        const expData = await expResponse.json();
        setExperienceData(expData);

      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    }

    fetchData();
  }, []);

  // Display error message if there's an error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Display loading message while data is being fetched
  if (!userData || !classData || !experienceData) {
    return <div>Loading...</div>;
  }

  // Calculate user's level and experience to next level
  const level = Math.floor(experienceData.experience / 100) + 1;
  const expToNextLevel = experienceData.experience % 100;

  // Construct the full URL for the class avatar
  const avatarUrl = `http://localhost:8800${classData.class_avatar}`;

  // Render the profile button and popover
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="profile-avatar flex items-center justify-start bg-transparent hover:bg-transparent active:bg-transparent focus:ring-0 focus:ring-offset-0 px-0 font-thin"
        >
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage 
              src={avatarUrl} 
              alt={classData.class_name} 
            />
            <AvatarFallback>
              {userData.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-xl hide">{userData.username}</span>
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
            {/* User avatar and class information */}
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={avatarUrl}
                  alt={classData.class_name}
                />
                <AvatarFallback>
                  {classData.class_name[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold">
                  {userData.display_name || userData.username}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {classData.class_name}
                </p>
              </div>
            </div>
            {/* User level and experience information */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Level:</span>
                <span>{level}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Experience:</span>
                <span>{experienceData.experience} XP</span>
              </div>
              <Progress value={expToNextLevel} className="w-full h-2" />
              <p className="text-xs text-muted-foreground text-right">
                {expToNextLevel}/100 XP to next level
              </p>
            </div>
            {/* User email information */}
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