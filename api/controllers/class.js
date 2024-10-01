import { pool } from "../pool.js";

export const getClassInfo = async (req, res) => {
  try {
    const classId = req.params.id;
    const [rows] = await pool.query(
      "SELECT class_id, class_name, class_avatar FROM classes WHERE class_id = ?",
      [classId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching class info:', error);
    res.status(500).json({ message: "An error occurred while fetching class info" });
  }
};


export const getAllClasses = async (req, res) => {
  console.log("getAllClasses function called");
  try {
    const [rows] = await pool.query(
      "SELECT class_id, class_name, class_avatar FROM classes"
    );
    console.log("Query result:", rows);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching all classes:', error);
    res.status(500).json({ message: "An error occurred while fetching all classes" });
  }
};