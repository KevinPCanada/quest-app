import React, { useContext, useState, useEffect } from "react";
import RewardRadio from "../../components/RewardListComponents/RadioButton";
import RewardListItem from "../../components/RewardListComponents/RewardListItem";
import MilestoneButton from "../../components/RewardListComponents/MilestoneButton";
import { AuthContext } from "../../context/AuthContext";
import "./Reward.css";

//On this page, the user can set a new reward, see their list of rewards and set their milestone
//The milestone is how often the user can give themselves a reward

export default function RewardPage() {
  // Access user data and fetchRewards function from AuthContext
  const { currentUser, fetchRewards } = useContext(AuthContext);
  // State for storing rewards, new reward input, selected milestone, and loading status
  const [rewards, setRewards] = useState([]);
  const [newReward, setNewReward] = useState("");
  const [selectedMilestone, setSelectedMilestone] = useState("1");
  const [isLoading, setIsLoading] = useState(true);

  //   Display the rewards and correct Milestone Settings.
  useEffect(() => {
    // Function to fetch rewards and milestone data
    const getRewardsAndMilestone = async () => {
      setIsLoading(true);
      try {
        // Fetch rewards using the fetchRewards function from AuthContext
        const fetchedRewards = await fetchRewards();
        setRewards(fetchedRewards);

        // Fetch the user's current milestone setting
        const response = await fetch(`http://localhost:8800/api/user/${currentUser.user_id}/milestone`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch milestone');
        }

        const data = await response.json();
        setSelectedMilestone(data.milestone.toString());
      } catch (error) {
        console.error("Failed to fetch rewards or milestone:", error);
        // Handle error (e.g., show error message to user)
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch data if there's a current user
    if (currentUser) {
      getRewardsAndMilestone();
    }
  }, [currentUser, fetchRewards]);


  //   Create the reward
  // Function to handle adding a new reward
  const handleAddReward = async (e) => {
    e.preventDefault();
    if (!newReward.trim()) return; // Don't submit if the input is empty

    try {
      // Send POST request to add new reward
      const response = await fetch("http://localhost:8800/api/rewards/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // to include the cookie
        body: JSON.stringify({ description: newReward }),
      });

      if (!response.ok) {
        throw new Error("Failed to add reward");
      }

      // Refresh the rewards list
      const updatedRewards = await fetchRewards();
      setRewards(updatedRewards);

      // Clear the input field
      setNewReward("");
    } catch (error) {
      console.error("Error adding reward:", error);
      // Change to show the error to the the user later
    }
  };

  //   Delete the reward
  // Function to handle deleting a reward
  const handleDeleteReward = async (rewardId) => {
    try {
      // Send DELETE request to remove the reward
      const response = await fetch(
        `http://localhost:8800/api/rewards/delete/${rewardId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete reward");
      }

      // Remove the deleted reward from the state
      setRewards(rewards.filter((reward) => reward.id !== rewardId));
    } catch (error) {
      console.error("Error deleting reward:", error);
      // You might want to show an error message to the user here
    }
  };

  //   Edit the reward
  // Function to handle editing a reward
  const handleEditReward = async (rewardId, newDescription) => {
    try {
      // Send PUT request to update the reward
      const response = await fetch(
        `http://localhost:8800/api/rewards/edit/${rewardId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ description: newDescription }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit reward");
      }

      // Update the rewards on the page
      const updatedRewards = await fetchRewards();
      setRewards(updatedRewards);

    } catch (error) {
      console.error("Error editing reward:", error);
      // You might want to show an error message to the user here
    }
  };

  // Milestones

  // Update the Milestone state
  // Function to handle milestone selection change
  const handleMilestoneChange = (event) => {
    setSelectedMilestone(event.target.value);
  };

  // Handle the milestone submit
  // Function to submit the selected milestone
  const handleMilestoneSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send PUT request to update the milestone
      const response = await fetch(`http://localhost:8800/api/user/${currentUser.user_id}/milestone`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ milestone: selectedMilestone }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update milestone');
      }
  
      const data = await response.json();
      console.log(data.message);
      // I will show a success message to the user here later
    } catch (error) {
      console.error('Error updating milestone:', error);
      console.error('Response status:', error.response?.status);
      console.error('Response text:', await error.response?.text());
      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <>
      <main className="rewardpage">
        {/* Left side: Display existing rewards */}
        <div className="rewardpage-left">
          <div className="rewardpage-left-top">
            <div className="rewardpage-header">
              <h1>Rewards </h1>
              <i className="material-icons">download_done</i>
            </div>
            <span>Your list of rewards</span>
          </div>
          <div className="rewardpage-left-bottom">
            {/* Render rewards if available, otherwise show a message */}
            {rewards.length > 0 ? (
              rewards.map((reward) => (
                <RewardListItem
                  key={reward.id}
                  reward={reward}
                  onDelete={handleDeleteReward}
                  onEdit={handleEditReward}
                />
              ))
            ) : (
              <p>No rewards found. Add some rewards to get started!</p>
            )}
          </div>
        </div>

        {/* Right side: Add new rewards and set milestone */}
        <div className="rewardpage-right">
          {/* Form to add new reward */}
          <div className="rewardpage-right-top">
            <div className="rewardpage-right-top-header">
              <h2>Set new reward</h2>
              <i className="material-icons">add</i>
            </div>
            <form onSubmit={handleAddReward}>
              <input
                type="text"
                placeholder="Enter new reward"
                value={newReward}
                onChange={(e) => setNewReward(e.target.value)}
              />
              <input type="submit" value="add new reward" />
            </form>
          </div>
          {/* Form to set milestone */}
          <div className="rewardpage-right-bottom">
            <form onSubmit={handleMilestoneSubmit} className="milestone-form">
              <div className="rewardpage-right-bottom-header">
                <h2>Set milestone</h2>
                <i className="material-icons">vertical_align_bottom</i>
              </div>
              <span>How often would you like to set your milestone?</span>
              {/* Show loading message or milestone options */}
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <>
                  {/* Milestone radio button options */}
                  <RewardRadio
                    name="milestone"
                    value="1"
                    label="Every level"
                    checked={selectedMilestone === "1"}
                    onChange={handleMilestoneChange}
                  />
                  <RewardRadio
                    name="milestone"
                    value="2"
                    label="Every 2 levels"
                    checked={selectedMilestone === "2"}
                    onChange={handleMilestoneChange}
                  />
                  <RewardRadio
                    name="milestone"
                    value="5"
                    label="Every 5 levels"
                    checked={selectedMilestone === "5"}
                    onChange={handleMilestoneChange}
                  />
                  <RewardRadio
                    name="milestone"
                    value="10"
                    label="Every 10 levels"
                    checked={selectedMilestone === "10"}
                    onChange={handleMilestoneChange}
                  />
                  <MilestoneButton className="milestone-button" />
                </>
              )}
            </form>
          </div>
        </div>
      </main>
    </>
  );
}