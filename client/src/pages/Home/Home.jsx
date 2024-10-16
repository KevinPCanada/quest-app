import React, { useEffect, useState, useContext } from 'react';
import Quest from '../../components/Quest/Quest';
import HomeHeader from '../../components/HomeHeader/QuestboardHeader';
import { AuthContext } from '../../context/AuthContext';
import './Home.css';
import Skeleton from '../../components/HomeSkeleton/HomeSkeleton';
import HomeHeaderSkeleton from '../../components/HomeHeader/QuestboardHeaderSkeleton';

function Home() {

  const [quests, setQuests] = useState([]); // hold our list of quests
  const [loading, setLoading] = useState(true); // tells us if we're still loading data
  const [updating, setUpdating] = useState(false); // tells us if we're updating our quests
  const [error, setError] = useState(null); // hold any error messages
  
  // This gives us access to the current user's information
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  // This function gets our quests from the server
  const fetchQuests = async (isInitialLoad = false) => {
    try {
      // If we're not loading for the first time, we're updating
      if (!isInitialLoad) setUpdating(true);
      
      // We're asking the server for our quests
      const response = await fetch('http://localhost:8800/api/quests/incomplete', {
        method: 'GET',
        credentials: 'include', // This sends our login info with the request
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // This is like our ID card
          'Content-Type': 'application/json'
        }
      });

      // If something went wrong with our request, we stop here
      if (!response.ok) {
        throw new Error('Failed to fetch quests');
      }

      // We turn the response into data we can use
      const data = await response.json();

      // For each quest, we also get its experience points
      const questWithExp = await Promise.all(
        data.map(async (quest) => {
          const exp = await fetchExp(quest.id);
          return { ...quest, exp }; // We add the exp to our quest info
        })
      );

      // We update our list of quests
      setQuests(questWithExp);
    } catch (error) {
      // If something went wrong, we store the error message
      setError(error.message);
    } finally {
      // Whether it worked or not, we're done loading/updating
      setLoading(false);
      setUpdating(false);
    }
  };

  // This function gets the experience points for a single quest
  async function fetchExp(quest) {
    try {
      const token = localStorage.getItem('token');
      // We're asking the server for the exp of this quest
      const response = await fetch(`http://localhost:8800/api/quests/exp/${quest}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // If something went wrong, we stop here
      if (!response.ok) {
        throw new Error(`Failed to fetch exp for quest`);
      }

      const expData = await response.json();
      return expData[0].exp_reward;
    } catch (error) {
      console.error(error.message);
      // If we couldn't get the exp, we return 0
      return 0;
    }
  }

  // This runs when our page first loads
  useEffect(() => {
    // We get our quests when the page loads
    fetchQuests(true);
  }, []);

  // This function lets us update our quests list
  const updateQuests = () => {
    // We just call fetchQuests again to get fresh data
    fetchQuests();
  };

  // This function updates the user's information
  const updateUserData = async () => {
    try {
      // We're asking the server for the latest user info
      const response = await fetch(`http://localhost:8800/api/user/${currentUser.user_id}`, {
        credentials: 'include',
      });

      // If something went wrong, we stop here
      if (!response.ok) {
        throw new Error('Failed to fetch updated user data');
      }

      const userData = await response.json();
      // We update the user's information
      setCurrentUser(userData);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  // If there was an error at any point, we show it here
  if (error) return <p>Error: {error}</p>;

  // This is what shows up on our page
  return (
    <section className="questboard">
      {loading ? (
        // If we're still loading, we show a skeleton (placeholder) for the header
        <HomeHeaderSkeleton />
      ) : (
        // Once we're done loading, we show the real header
        <HomeHeader updateQuests={updateQuests} />
      )}

      {loading ? (
        // If we're still loading, we show a skeleton (placeholder) for the quests
        <Skeleton />
      ) : quests.length > 0 ? (
        // If we have quests, we show each one
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
        // If we don't have any quests, we show this message
        <p>No quests available.</p>
      )}
    </section>
  );
}

export default Home;