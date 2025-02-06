const gpaRecord = require('../models/gpaRecord.js'); // Mongoose model

// Function to get grade points based on grade and credits
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

// Function to calculate GPA
const calculateGPA = async (req, res) => {
    const { semester, modules } = req.body;

    let totalPoints = 0;
    let totalWeightedCredits = 0;

    try {
        for (const module of modules) {
            // Ensure credits are numbers
            const credits = parseInt(module.credits, 10);
            const grade = module.grade;
            const points = getGradePoints(grade, credits);
            
            totalPoints += points;
            totalWeightedCredits += credits;

            // Create new GPA record in the database
            await gpaRecord.create({
                semester: semester || 1, // default semester if not provided
                module_name: module.module_name,
                grade,
                credits,
                points
            });
        }

        // Calculate GPA with proper weighting
        const gpa = totalWeightedCredits > 0 ? (totalPoints / totalWeightedCredits) : 0;
        
        // Round to 2 decimal places
        const roundedGPA = Math.round((gpa + Number.EPSILON) * 100) / 100;
        
        res.json({ gpa: roundedGPA });
    } catch (err) {
        console.error('Error calculating GPA:', err);
        res.status(500).json({ message: 'Failed to calculate GPA' });
    }
};

// Function to save GPA to the database
const saveGPA = async (req, res) => {
    const { semester, gpa } = req.body;

    try {
        const existingGPA = await gpaRecord.findOne({ semester }).exec();
        
        if (existingGPA) {
            // Update GPA for the semester if it exists
            existingGPA.gpa = gpa;
            await existingGPA.save();
            res.json({ message: 'GPA updated successfully' });
        } else {
            // Create new GPA record if not exists
            await gpaRecord.create({ semester, gpa });
            res.json({ message: 'GPA saved successfully' });
        }
    } catch (err) {
        console.error('Error saving GPA:', err);
        res.status(500).json({ message: 'Failed to save GPA' });
    }
};

// Function to get CGPA (Cumulative GPA)
const getCGPA = async (req, res) => {
    try {
        const results = await gpaRecord.aggregate([
            { $group: { _id: null, avgGPA: { $avg: "$gpa" } } }
        ]);

        const cgpa = results[0]?.avgGPA || 0;
        res.json({ cgpa: Math.round(cgpa * 100) / 100 });
    } catch (err) {
        console.error('Error calculating CGPA:', err);
        res.status(500).json({ message: 'Failed to calculate CGPA' });
    }
};

module.exports = {
    saveGPA,
    getCGPA,
    calculateGPA,
    getGradePoints
};
