import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Trash2, RefreshCw } from "lucide-react";
import { DeleteAllButton } from "../../components/QuestHistory/delete-all-quests";
import { apiRequest } from "../../lib/apiRequest"; // Import the helper

export default function QuestHistory() {
  const [quests, setQuests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchCompletedQuests();
  }, []);

  const fetchCompletedQuests = async () => {
    try {
      setLoading(true);
      // No manual headers or error checks
      const data = await apiRequest("/quests/completed", "GET");
      setQuests(data);
    } catch (error) {
      console.error("Error fetching completed quests:", error);
      setError("Failed to load quests. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const deleteQuest = async (questId) => {
    try {
      // Just pass the method
      await apiRequest(`/quests/delete-quest/${questId}`, "DELETE");

      setQuests(quests.filter((quest) => quest.id !== questId));
      setMessage({ type: "success", text: "Quest deleted successfully" });
    } catch (error) {
      console.error("Error deleting quest:", error);
      setMessage({
        type: "error",
        text: "Failed to delete quest. Please try again.",
      });
    }
  };

  const restoreQuest = async (quest) => {
    if (!quest || !quest.id) {
      setMessage({ type: "error", text: "Failed to restore quest: Invalid quest data" });
      return;
    }

    try {
      // Pass body as the 3rd argument
      await apiRequest(`/quests/update-completion/${quest.id}`, "PUT", { 
        completed: false 
      });

      await fetchCompletedQuests();
      setMessage({ type: "success", text: "Quest restored successfully" });
    } catch (error) {
      console.error("Error restoring quest:", error);
      setMessage({
        type: "error",
        text: `Failed to restore quest: ${error.message}`,
      });
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="font-thin mx-auto p-5 min-h-screen bg-background font-pixelify">
      <h1 className="text-3xl mb-6 text-primary">Quest History</h1>
      
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

      {quests.length === 0 ? (
        <p>No completed quests found.</p>
      ) : (
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
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => restoreQuest(quest)}
                    aria-label="Restore quest"
                    className="hover:bg-secondary"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteQuest(quest.id)}
                    aria-label="Delete quest"
                    className="hover:bg-secondary"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
       <DeleteAllButton fetchCompletedQuests={fetchCompletedQuests}></DeleteAllButton>
    </div>
  );
}