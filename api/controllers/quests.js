import { pool } from "../pool.js";

export const addQuest = async (req, res) => {
    try {
        const { questName, questDescription, questLevel } = req.body;
        const userID = 2;

        await pool.query(
            "INSERT INTO tasks (userID, questName, questDesc, questLevel) VALUES (?, ?, ?, ?)",
            [userID, questName, questDescription, questLevel]
        );
        
       
        res.status(200).json({ message: "Quest added successfully" });

    } catch (error) {
       
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
};

export const deleteQuest = async (req, res) => {
    try {
        const idToDelete = getQuestByID

        await pool.query(
            'DELETE FROM tasks WHERE id = ?', [idToDelete]
        );
        res.status(200).json({ message: "Quest deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
}

async function getQuestByID(iD) {
    const task = await pool.query(
        'SELECT * FROM tasks WHERE id = ?', [iD]
    )

    return task

}