import React from "react";
import LevelBar from "../Level/Level";
import HeaderButton from "../HeaderButton/HeaderButton";
import NewQuest from "../NewQuest/NewQuest";
import "./QuestboardHeader.css";

function HomeHeader() {
  return (
        <div className="questboard-header">
          <div className="questboard-header-left">
            <LevelBar className="level-bar" exp="143255" />
          </div>
          <div className="questboard-header-right">
            <NewQuest/>
          </div>
        </div>
  );
}

export default HomeHeader;