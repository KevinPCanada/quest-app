import React, { useEffect, useState, useContext } from 'react';
import Quest from '../../components/Quest/Quest';
import HomeHeader from '../../components/HomeHeader/QuestboardHeader';
import { AuthContext } from '../../context/AuthContext';
import './Home.css';
import Skeleton from '../../components/HomeSkeleton/HomeSkeleton';
import HomeHeaderSkeleton from '../../components/HomeHeader/QuestboardHeaderSkeleton';

function Home() {
  // State management for quests, loading status, and errors
  // These states work together to manage the component's lifecycle and user experience
  const [quests, setQuests] = useState([]); // Stores the list of quests
  const [loading, setLoading] = useState(true); // Controls initial loading state
  const [updating, setUpdating] = useState(false); // Indicates when quests are being refreshed
  const [error, setError] = useState(null); // Stores any error messages
  
  // Access to user context for personalized data
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const fetchQuests = async (isInitialLoad = false) => {
    try {
      // Differentiate between initial load and updates to manage loading states
      // This prevents flickering of content during updates
      if (!isInitialLoad) setUpdating(true);
      
      // Fetch quests from the server, including authentication for secure access
      const response = await fetch('http://localhost:8800/api/quests/incomplete', {
        method: 'GET',
        credentials: 'include', // Ensures user session is maintained
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // JWT for secure API access
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch quests');
      }

      const data = await response.json();

      // Fetch experience points for each quest concurrently
      // This optimizes performance by reducing wait time for sequential requests
      const questWithExp = await Promise.all(
        data.map(async (quest) => {
          const exp = await fetchExp(quest.id);
          return { ...quest, exp }; // Combine quest data with its exp
        })
      );

      setQuests(questWithExp); // Update state with fetched quests
    } catch (error) {
      setError(error.message); // Store error for user feedback
    } finally {
      // Update loading states to reflect completed fetch operation
      setLoading(false);
      setUpdating(false);
    }
  };

  async function fetchExp(quest) {
    try {
      const token = localStorage.getItem('token');
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
      return 0; // Return 0 exp on error to prevent breaking the UI
    }
  }

  useEffect(() => {
    // Initial data fetch when component mounts
    // This ensures data is loaded as soon as the page is accessed
    fetchQuests(true);
  }, []);

  const updateQuests = () => {
    // Allows child components to trigger quest list refresh
    // This function helps maintain data consistency across the app
    fetchQuests();
  };

  const updateUserData = async () => {
    try {
      // Fetch updated user data independently of quests
      // This allows for updating user info without refreshing all quests
      const response = await fetch(`http://localhost:8800/api/user/${currentUser.user_id}`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch updated user data');
      }

      const userData = await response.json();
      setCurrentUser(userData); // Update global user context
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  // Error handling for a better user experience
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="questboard">
      {loading ? (
        // Show skeleton loader during initial load for a smoother user experience
        <HomeHeaderSkeleton />
      ) : (
        // Render actual header once data is loaded
        <HomeHeader updateQuests={updateQuests} />
      )}

      {loading ? (
        // Show skeleton loader for quest list during initial load
        <Skeleton />
      ) : quests.length > 0 ? (
        // Render quests if available, passing necessary props for functionality
        quests.map((quest) => (
          <Quest
            key={quest.id}
            id={quest.id}
            title={quest.quest_name}
            description={quest.quest_description}
            exp={quest.exp}
            level={quest.difficulty_name}
            updateQuests={updateQuests}
            updateUserData={updateUserData}
            updating={updating}
          />
        ))
      ) : (
        // Provide feedback if no quests are available
        <p>No quests available.</p>
      )}
    </section>
  );
}

export default Home;