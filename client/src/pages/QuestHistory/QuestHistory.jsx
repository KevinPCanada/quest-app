import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Trash2, RefreshCw } from "lucide-react";

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
      const response = await fetch(
        "http://localhost:8800/api/quests/completed",
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch completed quests");
      }

      const data = await response.json();
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
      const response = await fetch(
        `http://localhost:8800/api/quests/delete-quest/${questId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete quest");
      }

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
      console.error("Invalid quest object:", quest);
      setMessage({
        type: "error",
        text: "Failed to restore quest: Invalid quest data",
      });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8800/api/quests/update-completion/${quest.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ completed: false }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to restore quest");
      }

      await fetchCompletedQuests(); // Refresh the list after successful update
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

  if (loading) {
    return <div>Loading quests...</div>;
  }

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
