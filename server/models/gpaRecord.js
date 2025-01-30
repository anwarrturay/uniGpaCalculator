import db from '../config/dbConn.js';

export const gpaRecord = {
  createRecord: (semester, module_name, grade, credits, points, callback) => {
    const sql = 'INSERT INTO gpa_records (semester, module_name, grade, credits, points) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [semester, module_name, grade, credits, points], callback);
  },

  getAllRecords: (callback) => {
    const sql = 'SELECT * FROM gpa_records ORDER BY modules';
    db.query(sql, callback);
  },

  deleteRecord: (id, callback) => {
    const sql = 'DELETE FROM gpa_records WHERE id = ?';
    db.query(sql, [id], callback);
  },
};