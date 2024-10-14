import React, { useEffect, useState, useContext } from 'react';
import Quest from '../../components/Quest/Quest';
import HomeHeader from '../../components/HomeHeader/QuestboardHeader';
import { AuthContext } from '../../context/AuthContext';
import './Home.css';
import Skeleton from '../../components/HomeSkeleton/HomeSkeleton';
import HomeHeaderSkeleton from '../../components/HomeHeader/QuestboardHeaderSkeleton';

function Home() {

  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const fetchQuests = async (isInitialLoad = false) => {
    try {
      // We only set updating to true if it's not the initial load. This prevents showing a loading state on top of the skeleton loader during the initial render.
      if (!isInitialLoad) setUpdating(true);
      
      const response = await fetch('http://localhost:8800/api/quests/incomplete', {
        method: 'GET',
        credentials: 'include', // This ensures that cookies are sent with the request, which is necessary for authentication
        headers: {
          // We use a JWT stored in localStorage for authentication.
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        // If the response is not ok, we throw an error. This will be caught by the catch block below.
        throw new Error('Failed to fetch quests');
      }

      const data = await response.json();

      // We use Promise.all to fetch experience points for all quests concurrently. This is more efficient than fetching them sequentially.
      const questWithExp = await Promise.all(
        data.map(async (quest) => {
          const exp = await fetchExp(quest.id);
          return { ...quest, exp }; // We create a new object with all quest properties plus the exp
        })
      );

      setQuests(questWithExp);
    } catch (error) {
      // If an error occurs during fetching, we store it in state to display to the user
      setError(error.message);
    } finally {
      // Regardless of whether the fetch succeeded or failed, we need to update our loading states
      setLoading(false);
      setUpdating(false);
    }
  };

  async function fetchExp(quest) {
    try {
      const token = localStorage.getItem('token');
      // We fetch exp separately for each quest. This allows for potential future expansions where exp might be calculated dynamically on the server based on user-specific factors.
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
      // If we fail to fetch exp, we return 0 as a default value. This allows the application to continue functioning even if exp fetch fails for a quest.
      return 0;
    }
  }

  useEffect(() => {
    // We call fetchQuests when the component mounts to load the initial data. The 'true' argument indicates this is the initial load, affecting how loading states are handled.
    fetchQuests(true);
  }, []); // The empty dependency array ensures this effect only runs once on mount

  const updateQuests = () => {
    // This function allows child components to trigger a refresh of the quests data. It's useful for updating the quest list after completing a quest, for example.
    fetchQuests();
  };

  const updateUserData = async () => {
    try {
      // We fetch updated user data separately from quests. This allows us to update user-specific information (like experience points) without refreshing all quests.
      const response = await fetch(`http://localhost:8800/api/user/${currentUser.user_id}`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch updated user data');
      }

      const userData = await response.json();
      // We update the current user in the AuthContext, which will propagate the changes to all components that consume this context.
      setCurrentUser(userData);
    } catch (error) {
      console.error('Error updating user data:', error);
      // We don't set an error state here to avoid disrupting the main quest view. Instead, we just log the error to the console for debugging purposes.
    }
  };

  // If there's an error, we display it prominently. This helps users understand what went wrong and potentially how to resolve it (e.g., by refreshing the page).
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="questboard">
      {loading ? (
        // We show a skeleton loader for the header while data is being fetched. This provides a better user experience than a blank screen or generic loading spinner.
        <HomeHeaderSkeleton />
      ) : (
        // Once data is loaded, we render the actual header, passing the updateQuests function to allow the header to trigger quest list refreshes if needed.
        <HomeHeader updateQuests={updateQuests} />
      )}

      {loading ? (
        // Similar to the header, we show a skeleton loader for the quest list while loading.
        <Skeleton />
      ) : quests.length > 0 ? (
        // If we have quests, we map over them and render a Quest component for each one. We pass all necessary data and functions to each Quest component.
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
        // If we've finished loading but have no quests, we display a message to the user. This prevents confusion that might arise from an empty, silent interface.
        <p>No quests available.</p>
      )}
    </section>
  );
}

export default Home;