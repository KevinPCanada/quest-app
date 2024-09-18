import React from 'react'
import './Sidebar.css'

//This is the sidebar component,that will be accessible from any page and allow the user to navigate the webapp easily

export function Sidebar() {
  return (
    <div>
       <aside className="sidebar">
            <a href="" className="profile">
                <i className="material-icons">account_circle</i>
                <h1>user_name</h1>
            </a>
            <nav className="sidebar-menu">
                <ul>
                    <a className="sidebar-button" href="">
                        <i className="material-icons">star</i>
                        <p>Rewards</p>
                    </a>
                    <a className="sidebar-button" href="">
                        <i className="material-icons">receipt_long</i>
                        <p>Questboard</p>
                    </a>
                    <a className="sidebar-button" href="">
                        <i className="material-icons">menu_book</i>
                        <p>Quest History</p>
                    </a>
                </ul>
            </nav>
            <nav className="sidebar-footer">
                <a href="">About us</a>
                <a href="">Privacy Policy</a>
            </nav>
            <a href="" className="logout">
                <i className="material-icons">settings</i>
                <p>Logout</p>
            </a>
        </aside>
    </div>
  )
}

export default Sidebar