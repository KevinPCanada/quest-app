// Home.jsx

import React from 'react';

import Quest from '../../components/Quest/Quest';

import HomeHeader from '../../components/HomeHeader/QuestboardHeader';
import './Home.css';

function Home() {
  return (
      <section className="questboard">
        <HomeHeader></HomeHeader>
        <Quest 
          title="Tell Nour I'm Eating a Kebab"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in"
          exp={10}
        />
        <Quest 
          title="Tell Nour I'm Eating a Kebab"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in"
          exp={10}
        />
        <Quest 
          title="Tell Nour I'm Eating a Kebab"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in"
          exp={10}
        />
        <Quest 
          title="Tell Nour I'm Eating a Kebab"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in"
          exp={10}
        />
        <Quest 
          title="Tell Nour I'm Eating a Kebab"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in"
          exp={10}
        />
        <Quest 
          title="Tell Nour I'm Eating a Kebab"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in"
          exp={10}
        />
      </section>
  );
}

export default Home;
