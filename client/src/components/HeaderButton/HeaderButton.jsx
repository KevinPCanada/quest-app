import React from 'react';
import './HeaderButton.css';

function HeaderButton({ icon, text, onClick }) {
  return (
    <button className="questboard-header-button" onClick={onClick}>
      {icon && <i className="material-icons">{icon}</i>}
      <p>{text}</p>
    </button>
  );
}

export default HeaderButton;