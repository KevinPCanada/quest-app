import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "/src/context/AuthContext";
import ProfileButton from "../Profile/Profile.jsx";
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
        <ProfileButton />
        <nav className="sidebar-menu">
          <ul>
            <Link to="/rewards" className="sidebar-button">
              <i className="material-icons">star</i>
              <p className="hide">Rewards</p>
            </Link>
            <Link to="/" className="sidebar-button">
              <i className="material-icons">receipt_long</i>
              <p className="hide">Questboard</p>
            </Link>
            <Link to="/quest-history" className="sidebar-button">
              <i className="material-icons">menu_book</i>
              <p className="hide">Quest History</p>
            </Link>
          </ul>
        </nav>
        <nav className="sidebar-info">

          <Link to="/about">
            <i className="material-icons hide-full">info</i>
            <p className="hide">About us</p>
          </Link>
          <Link to="/privacy">
            <i className="material-icons hide-full">policy</i>
            <p className="hide">Privacy</p>
          </Link>

        </nav>
        <div className="sidebar-footer">
        {currentUser && (
          <button className="auth-button" onClick={handleLogout}>
            <i className="material-icons hide-full">logout</i>
            <p className="hide">Logout</p>
          </button>
        )}
        <Link className="sidebar-settings"to="/settings">
          <i className="material-icons">settings</i>
        </Link>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;