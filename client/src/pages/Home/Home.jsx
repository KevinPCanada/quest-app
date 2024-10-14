import React, { useEffect, useState, useContext } from 'react';
import Quest from '../../components/Quest/Quest';
import HomeHeader from '../../components/HomeHeader/QuestboardHeader';
import { AuthContext } from '../../context/AuthContext';
import './Home.css';
import Skeleton from '../../components/HomeSkeleton/HomeSkeleton';
import HomeHeaderSkeleton from '../../components/HomeHeader/QuestboardHeaderSkeleton';

function Home() {
  // State for storing quests, loading status, and any errors
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // We use AuthContext to access user data across components without prop drilling
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const fetchQuests = async () => {
    try {
      // We fetch incomplete quests to show only active quests to the user
      const response = await fetch('http://localhost:8800/api/quests/incomplete', {
        method: 'GET',
        credentials: 'include', // Ensures cookies are sent with the request for authentication
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // JWT for secure API access
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch quests');
      }

      const data = await response.json();

      // We fetch exp separately for each quest to allow for dynamic exp calculation on the server
      const questWithExp = await Promise.all(
        data.map(async (quest) => {
          const exp = await fetchExp(quest.id);
          return { ...quest, exp }; // Combine quest data with its exp
        })
      );

      setQuests(questWithExp);
    } catch (error) {
      // Set error state to inform user of fetch failure
      setError(error.message);
    } finally {
      // Always set loading to false to update UI, regardless of success or failure
      setLoading(false);
    }
  };

  async function fetchExp(quest) {
    try {
      const token = localStorage.getItem('token');
      // Separate API call for exp allows for potential future expansion of exp calculation logic
      const response = await fetch(`http://localhost:8800/api/quests/exp/${quest}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch exp for quest`);
      }

      const expData = await response.json();
      return expData[0].exp_reward;
    } catch (error) {
      console.error(error.message);
      // Return 0 exp on error to prevent breaking the UI, allowing quests to still be displayed
      return 0;
    }
  }

  // useEffect ensures quests are fetched when the component mounts
  // This provides initial data without requiring user interaction
  useEffect(() => {
    fetchQuests();
  }, []);

  // Separate function for updating quests allows for easy refresh functionality
  const updateQuests = () => {
    setLoading(true); // Show loading state to user during refresh
    fetchQuests(); // Re-fetch quests to get latest data
  };

  // Function to update user data, separate from quest data
  // This allows for updating user info without refreshing quests
  const updateUserData = async () => {
    try {
      const response = await fetch(`http://localhost:8800/api/user/${currentUser.user_id}`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch updated user data');
      }

      const userData = await response.json();
      // Update AuthContext to reflect new user data across the app
      setCurrentUser(userData);
    } catch (error) {
      console.error('Error updating user data:', error);
      // We don't set error state here to avoid disrupting the main quest view
    }
  };



  // Display errors to user, allowing for graceful failure
  if (error) return <p>Error: {error}</p>;



  return (
    <section className="questboard">
      {/* HomeHeader is separate for modularity and potential reuse */}
      {loading ? (
        <HomeHeaderSkeleton />
      ) : (
        <HomeHeader updateQuests={updateQuests} />
      )}


      {/* Conditional rendering based on quest availability improves user experience */}
      {quests.length > 0 ? (
        quests.map((quest, index) => (
          <Quest
            id={quest.id}
            key={index}
            title={quest.quest_name}
            description={quest.quest_description}
            exp={quest.exp}
            level={quest.difficulty_name}
            updateQuests={updateQuests}
            updateUserData={updateUserData}
          />
        ))
      ) : (
        <p>No quests available.</p>
      )}
    </section>
  );
}

export default Home;