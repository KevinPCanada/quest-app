import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import LevelBar from "../Level/Level";
import LevelSkeleton from "../Level/LevelSkeleton";
import NewQuest from "../NewQuest/NewQuest";
import { apiRequest } from "../../lib/apiRequest"; // Import helper
import "./QuestboardHeader.css";

function HomeHeader({ updateQuests }) {
  const [userData, setUserData] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;
      try {
        // CLEANER: GET request
        const data = await apiRequest(`/user/${currentUser.user_id}`, "GET");
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
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