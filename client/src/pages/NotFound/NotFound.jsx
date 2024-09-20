import React from 'react'
import './NotFound.css'
import errorImg from '../../assets/img/chicken.png';

function NotFound() {
  return (
    <div className="background-anchor">
      <div className="notfound-container">
        <div className="notfound-container-left">
          <span className="notfound-code">404</span>
          <h1 className="notfound-title">Page not found</h1>
        </div>
        <div className="notfound-container-right">
        <img className="notfound-img" src={errorImg}/>
        </div>
      </div>
    </div>
  )
}

export default NotFound
