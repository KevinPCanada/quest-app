import React from "react";
import LevelSkeleton from "../Level/LevelSkeleton";
import HeaderButton from "../HeaderButton/HeaderButton";
import NewQuest from "../NewQuest/NewQuest";
import "./QuestboardHeader.css";

function HomeHeaderSkeleton({updateQuests}) {
  return (
    <div className="questboard-header">
      <div className="questboard-header-left">
        <LevelSkeleton />
      </div>
      <div className="questboard-header-right">
        <NewQuest updateQuests={updateQuests}/>
      </div>
    </div>
  );
}

export default HomeHeaderSkeleton;
