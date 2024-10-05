import { pool } from "../pool.js";
import { calculateLevel } from '../utils/levelCalculations.js';

export const addQuest = async (req, res) => {
    try {
        const { questName, questDescription, questLevel } = req.body;
        const userID = req.user.id;

        const result = await pool.query(
            "INSERT INTO quests (user_id, quest_name, quest_description, quest_level, completed) VALUES (?, ?, ?, ?, '0')",
            [userID, questName, questDescription, questLevel]
        );


        res.status(200).json({ message: "Quest added successfully", result });

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
};

export const deleteQuest = async (req, res) => {
    try {
        const idToDelete = req.params.questId
        const userId = req.user.id;
        
        await pool.query(
            'DELETE FROM quests WHERE id = ? AND user_id = ?', [idToDelete, userId]
        );
        res.status(200).json({ message: "Quest deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
}

export const modifyQuest = async (req, res) => {
    try {
        const { questId, questName, questDescription, questLevel } = req.body;
        const userId = req.user.id;

        

        if (questName) {
            await pool.query(
                'UPDATE quests SET quest_name = ? WHERE id = ? AND user_id = ?', 
                [questName, questId, userId] 
            );
        }
        if (questDescription) {
            await pool.query(
                'UPDATE quests SET quest_description = ? WHERE id = ? AND user_id = ?', 
                [questDescription, questId, userId] 
            );
        }
        if (questLevel) {
            await pool.query(
                'UPDATE quests SET quest_level = ? WHERE id = ? AND user_id = ?', 
                [questLevel, questId, userId] 
            );
        }

       res.status(200).json({message:"Quest successfully updated"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while modifying the quest" });
    }
}

export const displayAllQuests = async (req, res) => {
    try {
        const userId = req.user.id;

        const query = `
            SELECT 
                quests.id,
                quests.quest_name, 
                quests.quest_description, 
                difficulty.difficulty_name 
            FROM quests
            JOIN difficulty ON quests.quest_level = difficulty.difficulty_level
            WHERE quests.user_id = ?;
        `;

        // Execute the query
        const [results] = await pool.query(query, [userId]);

        
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
};

export const getQuestByID = async (req, res) => {
    try {
        const questId = req.params.questId;
        const userId = req.user.id

        const query = `
            SELECT 
                quests.id,
                quests.quest_name, 
                quests.quest_description, 
                difficulty.difficulty_name 
            FROM quests
            JOIN difficulty ON quests.quest_level = difficulty.difficulty_level
            WHERE id = ? AND user_id = ?;
        `;

        // Execute the query
        const [results] = await pool.query(query, [questId, userId]);

        
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
};

export const completeQuest = async (req, res) => {
    try {
        const questId = req.params.questId;
        const userId = req.user.id;

        // Get the current experience and level
        const [currentUserData] = await pool.query(
            "SELECT experience, level FROM users WHERE user_id = ?",
            [userId]
        );

        if (currentUserData.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const currentExperience = currentUserData[0].experience;
        const currentLevel = currentUserData[0].level;

        // Get the quest experience reward
        const [questData] = await pool.query(`
            SELECT d.exp_reward
            FROM quests q
            JOIN difficulty d ON q.quest_level = d.difficulty_level
            WHERE q.id = ? AND q.user_id = ?
        `, [questId, userId]);

        if (questData.length === 0) {
            return res.status(404).json({ message: "Quest not found" });
        }

        const expReward = questData[0].exp_reward;

        // Calculate new experience
        const newExperience = currentExperience + expReward;

        // Calculate new level
        const newLevel = calculateLevel(newExperience);

        // Update experience, level, and complete the quest
        await pool.query(`
            UPDATE users u
            JOIN quests q ON u.user_id = q.user_id
            SET u.experience = ?,
                u.level = ?,
                q.completed = 1
            WHERE q.id = ? AND u.user_id = ?;
        `, [newExperience, newLevel, questId, userId]);

        const leveledUp = newLevel > currentLevel;

        res.status(200).json({ 
            message: "Quest Completed",
            experienceGained: expReward,
            newExperience,
            newLevel,
            leveledUp
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
};

export const getCompletedQuests = async (req, res) => {
    try {
        const userId = req.user.id;

        const query = `
            SELECT 
                quests.id,
                quests.id,
                quests.quest_name, 
                quests.quest_description, 
                difficulty.difficulty_name 
            FROM quests
            JOIN difficulty ON quests.quest_level = difficulty.difficulty_level
            WHERE quests.user_id = ? AND quests.completed = 1;
        `;

        // Execute the query
        const [results] = await pool.query(query, [userId]);

        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
};

export const getIncompleteQuests = async (req, res) => {
    try {
        const userId = req.user.id;

        const query = `
            SELECT 
                quests.id,
                quests.quest_name, 
                quests.quest_description, 
                difficulty.difficulty_name 
            FROM quests
            JOIN difficulty ON quests.quest_level = difficulty.difficulty_level
            WHERE user_id = ? AND completed = 0;
        `;

        // Execute the query
        const [results] = await pool.query(query, [userId]);

        
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
};
export const getExpByQuest = async (req, res) => {
    try {
        const questId = req.params.questId;
        const userId = req.user.id

        const query = `
             SELECT 
                difficulty.exp_reward
            FROM quests
            JOIN difficulty ON quests.quest_level = difficulty.difficulty_level
            WHERE quests.id = ? AND user_id = ?;
        `;

        // Execute the query
        const [results] = await pool.query(query, [questId, userId]);

        
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
};

export const deleteAllCompleted = async (req, res) => {
    try {
        
        const userId = req.user.id;
        
        await pool.query(
            'DELETE FROM quests WHERE completed = 1 AND user_id = ?', [userId]
        );
        res.status(200).json({ message: "Completed quests deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
}

export const updateQuestCompletion = async (req, res) => {
    try {
        const questId = req.params.questId;
        const userId = req.user.id;
        const { completed } = req.body;


        // Input validation
        if (!questId || questId === 'undefined') {
            return res.status(400).json({ message: "Invalid Quest ID" });
        }

        if (completed === undefined || completed === null) {
            return res.status(400).json({ message: "Completed status is required" });
        }

        // Convert the boolean to tinyint (0 or 1)
        const completedValue = completed ? 1 : 0;

        const [result] = await pool.query(
            'UPDATE quests SET completed = ? WHERE id = ? AND user_id = ?',
            [completedValue, questId, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Quest not found or you don't have permission to update it" });
        }

        res.status(200).json({ message: "Quest completion status updated successfully" });
    } catch (error) {
        console.error('Error updating quest completion status:', error);
        res.status(500).json({ message: "An error occurred while updating quest completion status", error: error.message });
    }
};

//complete quest
//get all quests
//get quest by ID
//controller and route for get quest experience by quest ID