import React, { useState } from 'react'
import "./Settings.css"
import knight from "../../assets/img/classes/knight.png"
import mage from "../../assets/img/classes/mage.png"
import priest from "../../assets/img/classes/priest.png"
import rogue from "../../assets/img/classes/rogue.png"

function Settings() {
  const [userInfo, setUserInfo] = useState({
    username: 'test',
    email: 'test@test.com',
    class: 'Warrior',
  })

  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [editUsername, setEditUsername] = useState(userInfo.username)

  const [isPopupVisible, setPopupVisible] = useState(false)
  const [selectedClass, setSelectedClass] = useState(userInfo.class)

  const handleEditClick = (field) => {
    if (field === 'username') {
      setIsEditingUsername(true)
      setEditUsername(userInfo.username)
    }
  }

  const handleSaveClick = (field) => {
    if (field === 'username') {
      setUserInfo({ ...userInfo, username: editUsername })
      setIsEditingUsername(false)
    }
  }

  const handleCancelClick = (field) => {
    if (field === 'username') {
      setIsEditingUsername(false)
    }
  }

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible)
  }

  const handleConfirm = () => {
    setUserInfo({ ...userInfo, class: selectedClass })
    togglePopup()
  }

  return (
    <main className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
      </div>

      {/* Username Section */}
      <div className="settings-container">
        <div className="settings-container-top">
          <h2>Username</h2>
          {!isEditingUsername && (
            <a href="#" onClick={() => handleEditClick('username')}>Edit</a>
          )}
        </div>
        <div className="settings-container-bottom">
          {isEditingUsername ? (
            <>
              <input
                type="text"
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
              />
              <button className="settings-save-button" onClick={() => handleSaveClick('username')}>Save</button>
              <button className="settings-cancel-button" onClick={() => handleCancelClick('username')}>Cancel</button>
            </>
          ) : (
            <p>{userInfo.username}</p>
          )}
        </div>
      </div>

      {/* Email Section */}
      <div className="settings-container">
        <div className="settings-container-top">
          <h2>Email</h2>
        </div>
        <div className="settings-container-bottom">
          <p>{userInfo.email}</p>
        </div>
      </div>

      {/* Class Popup */}
      {isPopupVisible && (
        <div className="settings-popup-overlay">
          <div className="settings-popup">
            <span className="settings-close-btn" onClick={togglePopup}>X</span>
            <h3>Select Class</h3>
            <div className="settings-popup-container">
              <div className="settings-popup-img-container">
                <img
                  className={`settings-popup-img ${selectedClass === 'Knight' ? 'selected' : ''}`}
                  src={knight}
                  onClick={() => setSelectedClass('Knight')}
                />
                <p>Knight</p>
              </div>
              <div className="settings-popup-img-container">
                <img
                  className={`settings-popup-img ${selectedClass === 'Mage' ? 'selected' : ''}`}
                  src={mage}
                  onClick={() => setSelectedClass('Mage')}
                />
                <p>Mage</p>
              </div>
              <div className="settings-popup-img-container">
                <img
                  className={`settings-popup-img ${selectedClass === 'Priest' ? 'selected' : ''}`}
                  src={priest}
                  onClick={() => setSelectedClass('Priest')}
                />
                <p>Priest</p>
              </div>
              <div className="settings-popup-img-container">
                <img
                  className={`settings-popup-img ${selectedClass === 'Rogue' ? 'selected' : ''}`}
                  src={rogue}
                  onClick={() => setSelectedClass('Rogue')}
                />
                <p>Rogue</p>
              </div>
            </div>
            <button className="settings-confirm-btn" onClick={handleConfirm}>Confirm</button>
          </div>
        </div>
      )}

      {/* Class Section */}
      <div className="settings-container">
        <div className="settings-container-top">
          <h2>Class</h2>
          <a href="#" onClick={togglePopup}>Edit</a>
        </div>
        <div className="settings-container-bottom">
          <p>{userInfo.class}</p>
        </div>
      </div>
    </main>
  )
}

export default Settings
