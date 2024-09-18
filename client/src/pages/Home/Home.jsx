import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import LevelBar from '../../components/Level/Level'
import './Home.css'

function Home() {
  return (
    <main>
      <section className="questboard">
        <div className="questboard-header">
          <div className="questboard-header-bottom">
            <div className="questboard-header-left">
              <LevelBar className="level-bar" exp='143255' ></LevelBar>
            </div>
            <div className="questboard-header-right">
              <a className="questboard-header-button" href="">
                <p>Filter</p>
                <i className="material-icons">arrow_drop_down</i>
              </a>
              <a className="questboard-header-button" href="">
                <i className="material-icons">edit</i>
                <p>New Quest</p>
              </a>
            </div>
          </div>
        </div>

        <article className="quest-container">
          <div className="quest-container-bottom">
            <h2>Tell Nour I'm Eating a Kebab</h2>
            <div className="quest-container-left">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in
              </p>
              <div className="quest-options">
                <a href="">View Full Quest</a>
                <a className="quest-edit-button" href="">
                  Edit
                </a>
              </div>
            </div>
          </div>
          <div className="quest-container-right">
            <a className="quest-complete-button" href="">
              <span>Quest Complete</span>
              <i className="material-icons">done_outline</i>
              <p>+10 EXP</p>
            </a>
          </div>
        </article>
      </section>
    </main>
  )
}

export default Home

