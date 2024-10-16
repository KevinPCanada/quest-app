import React, { useState, useEffect, useRef } from "react";
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
  const displayNameInputRef = useRef(null);
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
      setTimeout(() => {
        if (displayNameInputRef.current) {
          displayNameInputRef.current.focus();
          displayNameInputRef.current.select();
        }
      }, 0);
    }
  };

  const handleDisplayNameChange = (value) => {
    setEditDisplayName(value);
    // Consider empty string as a valid change
    setPendingChanges((prev) => ({ ...prev, display_name: value }));
    setHasChanges(true);
  };

  const handleSaveClick = (field) => {
    if (field === "display_name") {
      setIsEditingDisplayName(false);
      // Update local state, but don't clear pending changes
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
      // Update display name if changed (including to empty string)
      if ("display_name" in pendingChanges) {
        const response = await fetch(
          `http://localhost:8800/api/user/${userInfo.user_id}/display-name`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              display_name: pendingChanges.display_name || null,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update display name");
        }
      }

      // Update class if changed
      if (pendingChanges.class_id) {
        const response = await fetch(
          `http://localhost:8800/api/user/${userInfo.user_id}/class`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ class_id: pendingChanges.class_id }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update class");
        }
      }

      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.error("Error saving changes:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  const deleteUser = async () => {
    try {
      console.log('Deleting Quests');
      const response = await fetch(`http://localhost:8800/api/user/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      ;
  
      return await response.json();
    } catch (error) {
      console.error("Failed to delete user, please try again", error);
      throw error;
    }
  };
const handleDeleteUser = async () => {
  const confirmDelete = window.confirm(`Are you sure you want to delete your account?`);
  if (confirmDelete) {
    try {

      await deleteUser();
      console.log("User deleted.");


      alert(`User account and associated quests have been deleted.`);

      window.location.href = "http://localhost:5173/auth"
    } catch (error) {
      console.error("Error during account deletion process:", error);
    }
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
              ref={displayNameInputRef}
              autoFocus
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
                  className={`settings-popup-img ${selectedClass === classItem.class_id ? "selected" : ""
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

    <button className="delete-user-button" onClick={handleDeleteUser}>Delete User</button>
  </main>
);
}

export default Settings;
