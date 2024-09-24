import React from "react";
import "./QuestCompleteButton.css";

function QuestCompleteButton({ exp, onClick }) {
  return (
    <button className="quest-complete-button" onClick={onClick}>
      <span>Quest Complete</span>
      <i className="material-icons">done_outline</i>
      <p>+{exp} EXP</p>
    </button>
  );
}

export default QuestCompleteButton;