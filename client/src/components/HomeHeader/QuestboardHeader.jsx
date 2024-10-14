import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import LevelBar from "../Level/Level";
import LevelSkeleton from "../Level/LevelSkeleton";
import HeaderButton from "../HeaderButton/HeaderButton";
import NewQuest from "../NewQuest/NewQuest";
import "./QuestboardHeader.css";

function HomeHeader({updateQuests}) {
  const [userData, setUserData] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;
      try {
        const response = await fetch(`http://localhost:8800/api/user/${currentUser.user_id}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
       
        const data = await response.json();
        setUserData(data);
       
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error (e.g., show error message to user)
      }
    };
    fetchUserData();
  }, [currentUser]);
 
  return (
    <div className="questboard-header">
      <div className="questboard-header-left">
        {userData ? (
          <LevelBar className="level-bar" experience={userData.experience} level={userData.level} />
        ) : (
          <LevelSkeleton />
        )}
      </div>
      <div className="questboard-header-right">
        <NewQuest updateQuests={updateQuests}/>
      </div>
    </div>
  );
}

export default HomeHeader;