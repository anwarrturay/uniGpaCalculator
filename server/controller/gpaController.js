import { gpaRecord } from '../models/gpaRecord.js';
import db from '../config/dbConn.js';
                                                   
const getGradePoints = (grade, credits) => {
    let basePoints;
    switch (grade) {
        case 'A+': basePoints = 5.00; break;
        case 'A': basePoints = 5.00; break;
        case 'A-': basePoints = 4.70; break;
        case 'B+': basePoints = 4.30; break;
        case 'B': basePoints = 4.00; break;
        case 'B-': basePoints = 3.70; break;
        case 'C+': basePoints = 3.30; break;
        case 'C': basePoints = 3.00; break;
        case 'C-': basePoints = 2.70; break;
        case 'D': basePoints = 2.00; break;
        case 'E': basePoints = 1.00; break;
        case 'F': basePoints = 0.00; break;
        default: basePoints = 0.00;
    }

    // Adjust points based on credit hours
    return basePoints * credits;
};

export const calculateGPA = (req, res) => {
    const { semester, modules } = req.body;

    let totalPoints = 0;
    let totalWeightedCredits = 0;

    modules.forEach(module => {
        // Ensure credits are numbers
        const credits = parseInt(module.credits, 10);
        const grade = module.grade;
        const points = getGradePoints(grade, credits);
        
        totalPoints += points;
        totalWeightedCredits += credits;

        gpaRecord.createRecord(
            semester || 1, //default semester if not provided
            module.module_name,
            grade,
            credits,
            points,
            (err) => {
                if (err) console.error('Error creating record:', err)
            }
        );
    });

    // Calculate GPA with proper weighting
    const gpa = totalWeightedCredits > 0 ? (totalPoints / totalWeightedCredits) : 0;
    
    // Round to 2 decimal places
    const roundedGPA = Math.round((gpa + Number.EPSILON) * 100) / 100;
    
    res.json({ gpa: roundedGPA });
};

export const saveGPA = async (req, res) => {
    const { semester, gpa } = req.body;
    
    const sql = 'INSERT INTO semester_gpa (semester, gpa) VALUES (?, ?) ON DUPLICATE KEY UPDATE gpa = ?';
    
    db.query(sql, [semester, gpa, gpa], (err, result) => {
        if (err) {
            console.error('Error saving GPA:', err);
            res.status(500).json({ error: 'Failed to save GPA' });
            return;
        }
        res.json({ message: 'GPA saved successfully' });
    });
};

export const getCGPA = async (req, res) => {
    const sql = 'SELECT AVG(gpa) as cgpa FROM semester_gpa';
    
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error calculating CGPA:', err);
            res.status(500).json({ error: 'Failed to calculate CGPA' });
            return;
        }
        const cgpa = result[0].cgpa || 0;
        res.json({ cgpa: Math.round(cgpa * 100) / 100 });
    });
};