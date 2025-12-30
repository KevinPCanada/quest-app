import React, { useEffect, useState, useContext } from 'react';
import Quest from '../../components/Quest/Quest';
import HomeHeader from '../../components/HomeHeader/QuestboardHeader';
import { AuthContext } from '../../context/AuthContext';
import Skeleton from '../../components/HomeSkeleton/HomeSkeleton';
import HomeHeaderSkeleton from '../../components/HomeHeader/QuestboardHeaderSkeleton';
import { apiRequest } from '../../lib/apiRequest'; // Import helper
import './Home.css';

function Home() {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const fetchQuests = async (isInitialLoad = false) => {
    try {
      if (!isInitialLoad) setUpdating(true);
      
      // 1. Get Quests 
      const data = await apiRequest("/quests/incomplete", "GET");

      // 2. Get EXP for each quest
      const questWithExp = await Promise.all(
        data.map(async (quest) => {
          try {
             // We don't need to manually pass tokens anymore, cookies handle it
             const expData = await apiRequest(`/quests/exp/${quest.id}`, "GET");
             return { ...quest, exp: expData[0]?.exp_reward || 0 };
          } catch (e) {
             return { ...quest, exp: 0 };
          }
        })
      );

      setQuests(questWithExp);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setUpdating(false);
    }
  };

  // We can reuse the apiRequest for user updates too
  const updateUserData = async () => {
    try {
      const userData = await apiRequest(`/user/${currentUser.user_id}`, "GET");
      setCurrentUser(userData);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  useEffect(() => {
    fetchQuests(true);
  }, []);

  // Wrapper for child components
  const updateQuests = () => fetchQuests();

  if (error) return <p>Error: {error}</p>;

  return (
    <section className="questboard">
      {loading ? <HomeHeaderSkeleton /> : <HomeHeader updateQuests={updateQuests} />}
      
      {loading ? (
        <Skeleton />
      ) : quests.length > 0 ? (
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
        <p>No quests available.</p>
      )}
    </section>
  );
}

export default Home;