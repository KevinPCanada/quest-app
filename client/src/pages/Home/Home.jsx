// Home.jsx

import React, { useEffect, useState } from 'react';

import Quest from '../../components/Quest/Quest';

import HomeHeader from '../../components/HomeHeader/QuestboardHeader';
import './Home.css';

function Home() {

  const [quests, setQuests] = useState([]);
  const [questExp, setQuestExp] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const response = await fetch('http://localhost:8800/api/quests/display-user', {
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

        setQuests(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuests();
    // fetchExp(quest.id)
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


  return (
    <section className="questboard">
      <HomeHeader />
      {quests.length > 0 ? (
        quests.map((quest, index) => (

          <Quest
            key={index}
            title={quest.quest_name}
            description={quest.quest_description}
            exp
          />
        ))
      ) : (
        <p>No quests available.</p>
      )}
    </section>
  );
}

// async function fetchExp(quest) {
//   try {
//     const token = localStorage.getItem('token');
//     console.log('Token:', token);

//     const response = await fetch(`http://localhost:8800/api/quests/exp/${quest}`, {
//       method: 'GET',
//       credentials: 'include',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     if (!response.ok) {
//       throw new Error('Failed to get EXP');
//     }

//     const data = await response.json();
//     setQuestExp(data);

//   } catch (error) {
//     console.error(error.message);
//   }
// }

export default Home;

