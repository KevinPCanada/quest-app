import React from 'react'

export function Sidebar() {
  return (
    <div>
       <aside class="sidebar">
            <a href="" class="profile">
                <span class="material-symbols-outlined">account_circle</span>
                <h1>user_name</h1>
            </a>
            <nav class="sidebar-menu">
                <ul>
                    <a class="sidebar-button" href="">
                        <span class="material-symbols-outlined">star</span>
                        <p>Rewards</p>
                    </a>
                    <a class="sidebar-button" href="">
                        <span class="material-symbols-outlined">receipt_long</span>
                        <p>Questboard</p>
                    </a>
                    <a class="sidebar-button" href="">
                        <span class="material-symbols-outlined">menu_book</span>
                        <p>Quest History</p>
                    </a>
                </ul>
            </nav>
            <nav class="sidebar-footer">
                <a href="">About us</a>
                <a href="">Privacy Policy</a>
            </nav>
            <a href="" class="logout">
                <span class="material-symbols-outlined">settings</span>
                <p>Logout</p>
            </a>
        </aside>
    </div>
  )
}

export default Sidebar