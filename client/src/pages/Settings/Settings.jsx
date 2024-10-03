import React, { useState, useEffect } from "react";
import "./Settings.css";

function Settings() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    class_id: null,
    display_name: "",
  });

  const [classes, setClasses] = useState([]);
  const [isEditingDisplayName, setIsEditingDisplayName] = useState(false);
  const [editDisplayName, setEditDisplayName] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");

  // New state to track changes
  const [hasChanges, setHasChanges] = useState(false);
  const [pendingChanges, setPendingChanges] = useState({});

  useEffect(() => {
    fetchUserData();
    fetchClasses();
  }, []);

  const fetchUserData = async () => {
    try {
      const userDataString = localStorage.getItem("user");
      if (!userDataString) {
        throw new Error("No user data found in local storage");
      }

      const { user_id } = JSON.parse(userDataString);
      const response = await fetch(
        `http://localhost:8800/api/user/${user_id}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();
      setUserInfo(userData);
      setSelectedClass(userData.class_id);
      setEditDisplayName(userData.display_name || "");
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle error (e.g., redirect to login page or show error message)
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await fetch("http://localhost:8800/api/classes", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch class data");
      }

      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error("Error fetching class data:", error);
      // Handle error (e.g., show error message)
    }
  };

  const handleEditClick = (field) => {
    if (field === "display_name") {
      setIsEditingDisplayName(true);
      setEditDisplayName(userInfo.display_name || userInfo.username);
    }
  };

  const handleDisplayNameChange = (value) => {
    setEditDisplayName(value);
    setPendingChanges((prev) => ({ ...prev, display_name: value }));
    setHasChanges(true);
  };

  const handleSaveClick = (field) => {
    if (field === "display_name") {
      setIsEditingDisplayName(false);
      setUserInfo((prev) => ({ ...prev, display_name: editDisplayName }));
    }
  };

  const handleCancelClick = (field) => {
    if (field === "display_name") {
      setIsEditingDisplayName(false);
      setEditDisplayName(userInfo.display_name || userInfo.username);
      setPendingChanges((prev) => {
        const { display_name, ...rest } = prev;
        return rest;
      });
      setHasChanges(Object.keys(pendingChanges).length > 1);
    }
  };

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleClassSelection = (classId) => {
    setSelectedClass(classId);
    setPendingChanges((prev) => ({ ...prev, class_id: classId }));
    setHasChanges(true);
  };

  const handleConfirm = () => {
    setPopupVisible(false);
    setUserInfo((prev) => ({ ...prev, class_id: selectedClass }));
  };

  const handleSaveChanges = async () => {
    try {
      // Update display name if changed
      if (pendingChanges.display_name) {
        await fetch(
          `http://localhost:8800/api/user/${userInfo.user_id}/display-name`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ display_name: pendingChanges.display_name }),
          }
        );
      }

      // Update class if changed
      if (pendingChanges.class_id) {
        await fetch(
          `http://localhost:8800/api/user/${userInfo.user_id}/class`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ class_id: pendingChanges.class_id }),
          }
        );
      }

      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.error("Error saving changes:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <main className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
      </div>

      {/* Display Name Section */}
      <div className="settings-container">
        <div className="settings-container-top">
          <h2>Display Name</h2>
          {!isEditingDisplayName && (
            <a href="#" onClick={() => handleEditClick("display_name")}>
              Edit
            </a>
          )}
        </div>
        <div className="settings-container-bottom">
          {isEditingDisplayName ? (
            <>
              <input
                type="text"
                value={editDisplayName}
                onChange={(e) => handleDisplayNameChange(e.target.value)}
              />
              <div>
                <button
                  className="settings-save-button"
                  onClick={() => handleSaveClick("display_name")}
                >
                  Confirm
                </button>
                <button
                  className="settings-cancel-button"
                  onClick={() => handleCancelClick("display_name")}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <p>{userInfo.display_name || userInfo.username}</p>
          )}
        </div>
      </div>

      {/* Class Popup */}
      {isPopupVisible && (
        <div className="settings-popup-overlay">
          <div className="settings-popup">
            <h3>Select Class</h3>
            <div className="settings-popup-container">
              {classes.map((classItem) => (
                <div
                  key={classItem.class_id}
                  className="settings-popup-img-container"
                >
                  <img
                    className={`settings-popup-img ${
                      selectedClass === classItem.class_id ? "selected" : ""
                    }`}
                    src={`http://localhost:8800${classItem.class_avatar}`}
                    onClick={() => handleClassSelection(classItem.class_id)}
                    alt={classItem.class_name}
                  />
                  <p>{classItem.class_name}</p>
                </div>
              ))}
            </div>
            <button className="settings-confirm-btn" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* Class Section */}
      <div className="settings-container">
        <div className="settings-container-top">
          <h2>Class</h2>
          <a href="#" onClick={togglePopup}>
            Edit
          </a>
        </div>
        <div className="settings-container-bottom">
          <p>
            {userInfo.class_id
              ? classes.find((c) => c.class_id === userInfo.class_id)
                  ?.class_name || "Updating..."
              : "Loading..."}
          </p>
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

      {/* Conditional Save Changes Button */}
      {hasChanges && (
        <button onClick={handleSaveChanges} className="save-changes-button">
          Save Changes
        </button>
      )}
    </main>
  );
}

export default Settings;
