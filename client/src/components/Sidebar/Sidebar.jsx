import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "/src/context/AuthContext";
import "./Sidebar.css";

export function Sidebar() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <aside className="sidebar">
        <Link to="/profile" className="profile">
          <i className="material-icons">account_circle</i>
          <h1>{currentUser ? currentUser.username : 'Guest'}</h1>
        </Link>
        <nav className="sidebar-menu">
          <ul>
            <Link to="/rewards" className="sidebar-button">
              <i className="material-icons">star</i>
              <p>Rewards</p>
            </Link>
            <Link to="/" className="sidebar-button">
              <i className="material-icons">receipt_long</i>
              <p>Questboard</p>
            </Link>
            <Link to="/quest-history" className="sidebar-button">
              <i className="material-icons">menu_book</i>
              <p>Quest History</p>
            </Link>
          </ul>
        </nav>
        <nav className="sidebar-info">
          <Link to="/about">About us</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </nav>
        <div className="sidebar-footer">
        {currentUser && (
          <button className="auth-button" onClick={handleLogout}>
            Logout
          </button>
        )}
        <Link to="/settings">
          <i className="material-icons">settings</i>
        </Link>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;