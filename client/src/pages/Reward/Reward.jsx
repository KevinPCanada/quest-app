import React, { useContext, useState, useEffect } from "react";
import RewardRadio from "../../components/RewardListComponents/RadioButton";
import RewardListItem from "../../components/RewardListComponents/RewardListItem";
import { AuthContext } from "../../context/AuthContext";
import "./Reward.css";

//On this page, the user can set a new reward, see their list of rewards and set their milestone
//The milestone is how often the user can give themselves a reward

export default function RewardPage() {
  const { currentUser, fetchRewards } = useContext(AuthContext);
  const [rewards, setRewards] = useState([]);
  const [newReward, setNewReward] = useState("");

  //   Display the rewards.
  useEffect(() => {
    const getRewards = async () => {
      try {
        const fetchedRewards = await fetchRewards();
        setRewards(fetchedRewards);
      } catch (error) {
        console.error("Failed to fetch rewards:", error);
        // Handle error (e.g., show error message to user)
      }
    };

    if (currentUser) {
      getRewards();
    }
  }, [currentUser, fetchRewards]);

  //   Create the reward

  const handleAddReward = async (e) => {
    e.preventDefault();
    if (!newReward.trim()) return; // Don't submit if the input is empty

    try {
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

  const handleDeleteReward = async (rewardId) => {
    try {
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

  return (
    <>
      <main className="rewardpage">
        <div className="rewardpage-left">
          <div className="rewardpage-left-top">
            <div className="rewardpage-header">
              <h1>Rewards </h1>
              <i className="material-icons">download_done</i>
            </div>
            <span>Your list of rewards</span>
          </div>
          <div className="rewardpage-left-bottom">
            {rewards.length > 0 ? (
              rewards.map((reward) => (
                <RewardListItem
                  key={reward.id}
                  reward={reward}
                  onDelete={handleDeleteReward}
                />
              ))
            ) : (
              <p>No rewards found. Add some rewards to get started!</p>
            )}
          </div>
        </div>

        <div className="rewardpage-right">
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
          <div className="rewardpage-right-bottom">
            <form>
              <div className="rewardpage-right-bottom-header">
                <h2>Set milestone</h2>
                <i className="material-icons">vertical_align_bottom</i>
              </div>
              <span>How often would you like to set your milestone?</span>
              <RewardRadio label="Every level"></RewardRadio>
              <RewardRadio label="Every 2 levels"></RewardRadio>
              <RewardRadio label="Every 5 levels"></RewardRadio>
              <RewardRadio label="Every 10 levels"></RewardRadio>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
