import React, { useContext, useState, useEffect } from "react";
import RewardRadio from "../../components/RewardListComponents/RadioButton";
import RewardListItem from "../../components/RewardListComponents/RewardListItem";
import MilestoneButton from "../../components/RewardListComponents/MilestoneButton";
import { AuthContext } from "../../context/AuthContext";
import { apiRequest } from "../../lib/apiRequest"; // Import helper
import "./Reward.css";

export default function RewardPage() {
  const { currentUser, fetchRewards } = useContext(AuthContext);
  const [rewards, setRewards] = useState([]);
  const [newReward, setNewReward] = useState("");
  const [selectedMilestone, setSelectedMilestone] = useState("1");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRewardsAndMilestone = async () => {
      setIsLoading(true);
      try {
        const fetchedRewards = await fetchRewards();
        setRewards(fetchedRewards);

        const data = await apiRequest(`/user/${currentUser.user_id}/milestone`, "GET");
        setSelectedMilestone(data.milestone.toString());
      } catch (error) {
        console.error("Failed to fetch rewards or milestone:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentUser) {
      getRewardsAndMilestone();
    }
  }, [currentUser, fetchRewards]);


  const handleAddReward = async (e) => {
    e.preventDefault();
    if (!newReward.trim()) return;

    try {

      await apiRequest("/rewards/add", "POST", { description: newReward });

      const updatedRewards = await fetchRewards();
      setRewards(updatedRewards);
      setNewReward("");
    } catch (error) {
      console.error("Error adding reward:", error);
    }
  };

  const handleDeleteReward = async (rewardId) => {
    try {

      await apiRequest(`/rewards/delete/${rewardId}`, "DELETE");

      setRewards(rewards.filter((reward) => reward.id !== rewardId));
    } catch (error) {
      console.error("Error deleting reward:", error);
    }
  };

  const handleEditReward = async (rewardId, newDescription) => {
    try {

      await apiRequest(`/rewards/edit/${rewardId}`, "PUT", { description: newDescription });

      const updatedRewards = await fetchRewards();
      setRewards(updatedRewards);
    } catch (error) {
      console.error("Error editing reward:", error);
    }
  };

  const handleMilestoneChange = (event) => {
    setSelectedMilestone(event.target.value);
  };

  const handleMilestoneSubmit = async (event) => {
    event.preventDefault();
    try {

      const data = await apiRequest(`/user/${currentUser.user_id}/milestone`, "PUT", {
         milestone: selectedMilestone 
      });
  
      console.log(data.message);
    } catch (error) {
      console.error('Error updating milestone:', error);
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
                  onEdit={handleEditReward}
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
            <form onSubmit={handleMilestoneSubmit} className="milestone-form">
              <div className="rewardpage-right-bottom-header">
                <h2>Set milestone</h2>
                <i className="material-icons">vertical_align_bottom</i>
              </div>
              <span>How often would you like to set your milestone?</span>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <>
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