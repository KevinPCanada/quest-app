import React from 'react'

export function Sidebar() {
  return (
    <div>
       <aside className="sidebar">
            <a href="" className="profile">
                <span className="material-symbols-outlined">account_circle</span>
                <h1>user_name</h1>
            </a>
            <nav className="sidebar-menu">
                <ul>
                    <a className="sidebar-button" href="">
                        <span className="material-symbols-outlined">star</span>
                        <p>Rewards</p>
                    </a>
                    <a className="sidebar-button" href="">
                        <span className="material-symbols-outlined">receipt_long</span>
                        <p>Questboard</p>
                    </a>
                    <a className="sidebar-button" href="">
                        <span className="material-symbols-outlined">menu_book</span>
                        <p>Quest History</p>
                    </a>
                </ul>
            </nav>
            <nav className="sidebar-footer">
                <a href="">About us</a>
                <a href="">Privacy Policy</a>
            </nav>
            <a href="" className="logout">
                <span className="material-symbols-outlined">settings</span>
                <p>Logout</p>
            </a>
        </aside>
    </div>
  )
}

export default Sidebar