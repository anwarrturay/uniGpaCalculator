import {gpaRecord} from '../models/gpaRecord.js';

const getGradeFromMarks = (marks) => {
    if (marks >= 90) return 'A+';
    if (marks >= 86) return 'A';
    if (marks >= 75) return 'A-';
    if (marks >= 70) return 'B+';
    if (marks >= 65) return 'B';
    if (marks >= 60) return 'B-';
    if (marks >= 50) return 'C+';
    if (marks >= 46) return 'C';
    if (marks >= 40) return 'C-';
    if (marks >= 37) return 'D';
    if (marks >= 35) return 'E';
    return 'F';
};
                                                   
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
    const { student_year, semester, modules } = req.body;

    let totalPoints = 0;
    let totalWeightedCredits = 0;

    modules.forEach(module => {
        // Ensure credits are numbers
        const credits = parseInt(module.credits, 10);
        const grade = module.grade || getGradeFromMarks(module.marks);
        const points = getGradePoints(grade, credits);
        
        totalPoints += points;
        totalWeightedCredits += credits;

        gpaRecord.createRecord(
            student_year,
            semester,
            module.module_name,
            module.marks,
            grade,
            credits,
            points,
            () => {}
        );
    });

    // Calculate GPA with proper weighting
    const gpa = totalWeightedCredits > 0 ? (totalPoints / totalWeightedCredits) : 0;
    
    // Round to 2 decimal places
    const roundedGPA = Math.round((gpa + Number.EPSILON) * 100) / 100;
    
    res.json({ gpa: roundedGPA });
};

