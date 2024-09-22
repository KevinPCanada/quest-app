import { pool } from "../pool.js";

export const addQuest = async (req, res) => {
    try {
        const { questName, questDescription, questLevel } = req.body;
        const userID = 2;

        const result = await pool.query(
            "INSERT INTO quests (user_id, quest_name, quest_description, quest_level) VALUES (?, ?, ?, ?)",
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
        const idToDelete = req.params.id

        await pool.query(
            'DELETE FROM quests WHERE id = ?', [idToDelete]
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

        //create 2 arrays, one for update fields and one for values
        //the first will create the query for SQL dynamically
        //the second will store the values to be inserted into the query
        let updateFields = [];
        let queryValues = [];

        //check if each item is present
        //if it is present in the req.body, it is added into the query and the values list
        if (questName) {
            updateFields.push(`quest_name = ?`);
            queryValues.push(questName);
        }
        if (questDescription) {
            updateFields.push(`quest_description = ?`);
            queryValues.push(questDescription);
        }
        if (questLevel) {
            updateFields.push(`quest_level = ?`);
            queryValues.push(questLevel);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({ message: "No fields provided to update" });
        }

        //add quest ID last, as it wwill be the last item added into the query
        queryValues.push(questId);

        //make the query by joining all elements from the first array 
        const updateQuery = `
            UPDATE quests 
            SET ${updateFields.join(', ')}
            WHERE id = ?
        `;

        //execute the query by adding the values into  it
        await pool.query(updateQuery, queryValues);

        res.status(200).json({ message: "Quest modified successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while modifying the quest" });
    }
}