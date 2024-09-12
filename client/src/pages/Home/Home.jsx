import React from 'react'
import LevelBar from '../../components/Level/Level'
import FullQuest from '../../components/Full_Quest/Full_Quest'

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <LevelBar exp='143255' ></LevelBar>
      <p>Welcome to the home page!</p>
      <FullQuest Quest={{name:'Do homework', description:'Javascript homework for w-coding', questLevel:'Challenging'}}></FullQuest>
    </div>

  )
}

export default Home
