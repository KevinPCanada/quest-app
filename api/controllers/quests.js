import { pool } from "../pool.js";

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
        const userId = req.user.id; // The user ID from the decoded token

        const query = `
            SELECT 
                quests.quest_name, 
                quests.quest_description, 
                difficulty.difficulty_name 
            FROM quests
            JOIN difficulty ON quests.quest_level = difficulty.difficulty_level
            WHERE quests.user_id = ?;
        `;

        // Execute the query
        const [results] = await pool.query(query, [userId]);

        console.log('Query results:', results);
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
                quests.quest_name, 
                quests.quest_description, 
                difficulty.difficulty_name 
            FROM quests
            JOIN difficulty ON quests.quest_level = difficulty.difficulty_level
            WHERE id = ? AND user_id = ?;
        `;

        // Execute the query
        const [results] = await pool.query(query, [questId, userId]);

        console.log('Query results:', results);
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

        console.log(questId)


        const result = await pool.query(`
            UPDATE quests
            SET completed = 1
            WHERE id = ? AND user_id = ?;
        `, [questId, userId]);

        res.status(200).json({ message: "Quest Completed" });

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
                quests.quest_name, 
                quests.quest_description, 
                difficulty.difficulty_name 
            FROM quests
            JOIN difficulty ON quests.quest_level = difficulty.difficulty_level
            WHERE user_id = ? AND completed = 1;
        `;

        // Execute the query
        const [results] = await pool.query(query, [userId]);

        console.log('Query results:', results);
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
                quests.quest_name, 
                quests.quest_description, 
                difficulty.difficulty_name 
            FROM quests
            JOIN difficulty ON quests.quest_level = difficulty.difficulty_level
            WHERE user_id = ? AND completed = 0;
        `;

        // Execute the query
        const [results] = await pool.query(query, [userId]);

        console.log('Query results:', results);
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

        console.log('Query results:', results);
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

//complete quest
//get all quests
//get quest by ID
//controller and route for get quest experience by quest ID