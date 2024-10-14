import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Trash2, RefreshCw } from "lucide-react";
import { DeleteAllButton } from "../../components/QuestHistory/delete-all-quests";

export default function QuestHistory() {
  // These variables store information that can change
  const [quests, setQuests] = useState([]); // List of completed quests
  const [error, setError] = useState(null); // Any error messages
  const [loading, setLoading] = useState(true); // Whether the page is still loading
  const [message, setMessage] = useState(null); // Messages to show to the user

  // This runs when the page first loads
  useEffect(() => {
    fetchCompletedQuests();
  }, []);

  // This function gets the list of completed quests from the server
  const fetchCompletedQuests = async () => {
    try {
      // Tell the page we're loading
      setLoading(true);
      
      // Ask the server for the completed quests
      const response = await fetch(
        "http://localhost:8800/api/quests/completed",
        {
          credentials: "include", // This sends our login info with the request
        }
      );

      // If the server doesn't respond well, we throw an error
      if (!response.ok) {
        throw new Error("Failed to fetch completed quests");
      }

      // Turn the response into data we can use
      const data = await response.json();
      // Save the quests we got from the server
      setQuests(data);
    } catch (error) {
      // If something goes wrong, we log it and set an error message
      console.error("Error fetching completed quests:", error);
      setError("Failed to load quests. Please try again later.");
    } finally {
      // Whether it worked or not, we're done loading
      setLoading(false);
    }
  };

  // This function deletes a quest from our list
  const deleteQuest = async (questId) => {
    try {
      // Ask the server to delete the quest
      const response = await fetch(
        `http://localhost:8800/api/quests/delete-quest/${questId}`,
        {
          method: "DELETE", // This tells the server we want to delete something
          credentials: "include", // Again, send our login info
        }
      );

      // If the server doesn't say it's okay, we throw an error
      if (!response.ok) {
        throw new Error("Failed to delete quest");
      }

      // Remove the deleted quest from our list
      setQuests(quests.filter((quest) => quest.id !== questId));
      // Show a success message
      setMessage({ type: "success", text: "Quest deleted successfully" });
    } catch (error) {
      // If something goes wrong, log it and show an error message
      console.error("Error deleting quest:", error);
      setMessage({
        type: "error",
        text: "Failed to delete quest. Please try again.",
      });
    }
  };

  // This function marks a completed quest as not completed (restores it)
  const restoreQuest = async (quest) => {
    // Check if we have a valid quest to restore
    if (!quest || !quest.id) {
      console.error("Invalid quest object:", quest);
      setMessage({
        type: "error",
        text: "Failed to restore quest: Invalid quest data",
      });
      return;
    }

    try {
      // Ask the server to mark the quest as not completed
      const response = await fetch(
        `http://localhost:8800/api/quests/update-completion/${quest.id}`,
        {
          method: "PUT", // This tells the server we want to update something
          headers: {
            "Content-Type": "application/json", // This tells the server we're sending JSON data
          },
          credentials: "include",
          body: JSON.stringify({ completed: false }), // Turn our data into a string the server can read
        }
      );

      // If the server doesn't say it's okay, we get the error message and throw it
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to restore quest");
      }

      // Get the updated list of completed quests
      await fetchCompletedQuests();
      // Show a success message
      setMessage({ type: "success", text: "Quest restored successfully" });
    } catch (error) {
      // If something goes wrong, log it and show an error message
      console.error("Error restoring quest:", error);
      setMessage({
        type: "error",
        text: `Failed to restore quest: ${error.message}`,
      });
    }
  };

  // This makes sure our messages disappear after 3 seconds
  useEffect(() => {
    if (message) {
      // Set a timer to clear the message
      const timer = setTimeout(() => setMessage(null), 3000);
      // This cleans up the timer if the component is removed before the timer finishes
      return () => clearTimeout(timer);
    }
  }, [message]);

  // If there's an error, show the error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  // This is what actually shows up on the page
  return (
    <div className="font-thin mx-auto p-5 min-h-screen bg-background font-pixelify">
      <h1 className="text-3xl mb-6 text-primary">Quest History</h1>
      <DeleteAllButton fetchCompletedQuests={fetchCompletedQuests}></DeleteAllButton>
      {/* This shows any success or error messages */}
      {message && (
        <div
          className={`mb-4 p-2 rounded-none ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}
      {/* If there are no quests, show this message */}
      {quests.length === 0 ? (
        <p>No completed quests found.</p>
      ) : (
        // If there are quests, show them in a list
        <div className="space-y-4">
          {quests.map((quest) => (
            <Card
              key={quest.id}
              className="shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <h2 className="text-lg font-semibold text-primary">
                    {quest.quest_name}
                  </h2>
                </div>
                <div className="flex gap-2">
                  {/* Button to mark a quest as not completed */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => restoreQuest(quest)}
                    aria-label="Restore quest"
                    className="hover:bg-secondary"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  {/* Button to delete a quest */}
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteQuest(quest.id)}
                    aria-label="Delete quest"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}