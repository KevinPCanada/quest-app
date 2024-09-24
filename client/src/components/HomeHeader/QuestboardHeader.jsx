import React from "react";
import LevelBar from "../Level/Level";
import HeaderButton from "../HeaderButton/HeaderButton";
import "./QuestboardHeader.css";

function HomeHeader() {
  return (
        <div className="questboard-header">
          <div className="questboard-header-left">
            <LevelBar className="level-bar" exp="143255" />
          </div>
          <div className="questboard-header-right">
            <HeaderButton
              text="Filter"
              icon="arrow_drop_down"
              onClick={() => console.log("Filter clicked")}
            />
            <HeaderButton
              text="New Quest"
              icon="edit"
              onClick={() => console.log("New Quest clicked")}
            />
          </div>
        </div>
  );
}

export default HomeHeader;
