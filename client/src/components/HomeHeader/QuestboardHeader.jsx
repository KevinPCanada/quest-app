import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../context/AuthContext'; // Adjust the import path as needed
import LevelBar from "../Level/Level";
import HeaderButton from "../HeaderButton/HeaderButton";
import NewQuest from "../NewQuest/NewQuest";
import "./QuestboardHeader.css";

function HomeHeader() {
  const [userExp, setUserExp] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserExp = async () => {
      if (!currentUser) return;

      try {
        const response = await fetch(`http://localhost:8800/api/user/${currentUser.user_id}/exp`, {
          method: 'GET',
          credentials: 'include', // This is important for including the auth cookie
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user experience');
        }

        const data = await response.json();
        setUserExp(data.experience);
      } catch (error) {
        console.error('Error fetching user experience:', error);
        // Handle error (e.g., show error message to user)
      }
    };

    fetchUserExp();
  }, [currentUser]);

  return (
    <div className="questboard-header">
      <div className="questboard-header-left">
        {userExp !== null ? (
          <LevelBar className="level-bar" exp={userExp} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div className="questboard-header-right">
        <NewQuest/>
      </div>
    </div>
  );
}

export default HomeHeader;