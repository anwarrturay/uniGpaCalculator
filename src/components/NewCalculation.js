import React, { useState } from 'react';
import axios from 'axios';
import { X, Plus } from "lucide-react"

const NewCalculation = () => {
    const [modules, setModules] = useState([
        { module_name: '', marks: '', grade: '', credits: 2 }
    ]);
    // const [studentYear, setStudentYear] = useState(1);
    // const [semester, setSemester] = useState(1);
    const [gpa, setGPA] = useState(null);

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
    
    const handleChange = (index, event) => {
        const values = [...modules];
        if (event.target.name === 'marks') {
            const marks = parseFloat(event.target.value);
            values[index].marks = marks;
            values[index].grade = marks ? getGradeFromMarks(marks) : '';
        } else if (event.target.name === 'credits') {
            // Ensure credits are converted to numbers
            values[index].credits = parseInt(event.target.value, 10);
        } else {
            values[index][event.target.name] = event.target.value;
        }
        setModules(values);
    };

    
    const handleAddModule = () => {
        setModules([...modules, { module_name: '', marks: '', grade: '', credits: 2 }]);
    };

    const handleDeleteModule = (index) => {
        const values = [...modules];
        values.splice(index, 1);
        setModules(values);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/gpa/calculate', {
                // student_year: studentYear,
                // semester,
                modules
            });
            setGPA(response.data.gpa);
        } catch (error) {
            console.error('Error calculating GPA:', error);
            setGPA(null); // Reset the GPA to null in case of error
        }
    };

    return (
        <div className="flex flex-col items-center justify-center relative top-24">
            <h2 className='font-medium font-Montserrat text-2xl'>Semester 1</h2>
            <form onSubmit={handleSubmit} >
                {/* <div className="year-semester-section">
                    <div>
                        <label>Year:</label>
                        <select 
                            value={studentYear} 
                            onChange={(e) => setStudentYear(parseInt(e.target.value))}
                        >
                            <option value={1}>1st Year</option>
                            <option value={2}>2nd Year</option>
                            <option value={3}>3rd Year</option>
                            <option value={4}>4th Year</option>
                        </select>
                    </div>
                    <div>
                        <label>Semester:</label>
                        <select 
                            value={semester} 
                            onChange={(e) => setSemester(parseInt(e.target.value))}
                        >
                            <option value={1}>1st Semester</option>
                            <option value={2}>2nd Semester</option>
                        </select>
                    </div>
                </div> */}
                {modules.map((module, index) => (
                    <div key={index} className='flex items-center justify-center mt-3'>
                        <input
                            type="text"
                            name="module_name"
                            placeholder="Module Name"
                            value={module.module_name}
                            onChange={(event) => handleChange(index, event)}
                            required
                            className='w-[200px] border border-[#ccc] rounded-md ml-2 font-Montserrat motion-preset-pop motion-duration-1500'
                        />
                        {/* <input
                            type="number"
                            name="marks"
                            placeholder="Marks (0-100)"
                            value={module.marks}
                            onChange={(event) => handleChange(index, event)}
                            min="0"
                            max="100"
                            required
                        /> */}
                        <div className="grade-display">
                            <select
                                name="grade"
                                value={module.grade}
                                onChange={(event) => handleChange(index, event)}
                                className='w-[50px] xs:w-[75px] mx-2 border border-[#ccc] rounded-md font-Montserrat motion-preset-pop motion-duration-1500'
                            >
                                <option value={''}></option>
                                <option value={'A+'}>A+</option>
                                <option value={'A'}>A</option>
                                <option value={'A-'}>A-</option>
                                <option value={'B+'}>B+</option>
                                <option value={'B'}>B</option>
                                <option value={'B-'}>B-</option>
                                <option value={'C+'}>C+</option>
                                <option value={'C'}>C</option>
                                <option value={'C-'}>C-</option>
                                <option value={'D'}>D</option>
                                <option value={'E'}>E</option>
                                <option value={'F'}>F</option>
                            </select>
                            {/* Grade: {module.grade} */}
                        </div>
                        <button 
                            type="button" 
                            className="bg-[#ff4444] rounded-full p-1.5 mr-2 motion-preset-pop motion-duration-1500"
                            onClick={() => handleDeleteModule(index)}
                        >
                            <X className='font-bold text-xl text-white'/>
                        </button>
                    </div>
                ))}
                <div className="mt-5 flex flex-col items-center">
                    <button 
                        type="button" 
                        onClick={handleAddModule}
                        className='border-2 border-[#007bff] text-blue-500 p-2 mb-3 rounded-3xl'
                    >
                        <Plus />
                    </button>
                    <button 
                        type="submit"
                        className='bg-[#0056b3] font-Montserrat font-medium text-white py-2 px-5 rounded-md'
                    >Calculate GPA</button>
                </div>
            </form>
            {gpa !== null && (
                <div className="result">
                    <h3>Your GPA: {gpa.toFixed(2)}</h3>
                </div>
            )}
        </div>
    );
};

export default NewCalculation;