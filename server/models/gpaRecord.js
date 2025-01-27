import db from '../config/dbConn.js';

export const gpaRecord = {
  createRecord: (student_year, semester, module_name, grade, credits, points, callback) => {
    const sql = 'INSERT INTO gpa_records (student_year, semester, module_name, grade, credits, points) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [student_year, semester, module_name, grade, credits, points], callback);
  },

  getAllRecords: (callback) => {
    const sql = 'SELECT * FROM gpa_records ORDER BY student_year, semester';
    db.query(sql, callback);
  },

  deleteRecord: (id, callback) => {
    const sql = 'DELETE FROM gpa_records WHERE id = ?';
    db.query(sql, [id], callback);
  },
};