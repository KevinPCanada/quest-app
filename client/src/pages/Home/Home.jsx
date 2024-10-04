import React, { useEffect, useState } from 'react';
import Quest from '../../components/Quest/Quest';
import HomeHeader from '../../components/HomeHeader/QuestboardHeader';
import './Home.css';

function Home() {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const fetchQuests = async () => {
    try {
      const response = await fetch('http://localhost:8800/api/quests/incomplete', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch quests');
      }

      const data = await response.json();
      const questWithExp = await Promise.all(
        data.map(async (quest) => {
          const exp = await fetchExp(quest.id);
          return { ...quest, exp };
        })
      );

      setQuests(questWithExp);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchQuests();
  }, []);

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
    }
  }

  const updateQuests = () => {
    setLoading(true);
    fetchQuests();  
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="questboard">
      <HomeHeader updateQuests={updateQuests} />
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
          />
        ))
      ) : (
        <p>No quests available.</p>
      )}
    </section>
  );
}

export default Home;