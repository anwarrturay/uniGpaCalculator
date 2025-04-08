import React, { useState, useEffect } from 'react';
import { X, Plus } from "lucide-react"
import useAuth from '../hooks/useAuth';
import Result from './Result';
// import { useRouter } from 'next/router';

const NewCalculation = () => {
    // USESTATES
    const [result, setResult] = useState("inactive")
    const [semester1Score, setSemester1Score] = useState({
        totalGrade: 0,
        gpa: 0
    })
    const [semester2Score, setSemester2Score] = useState({
        totalGrade: 0,
        gpa: 0
    })
    const [bothSemestersScore, setBothSemestersScore] = useState({
        totalGrade: 0,
        gpa: 0
    })
    const [semester1GPA, setSemester1GPA] = useState(null);
    const [semester2GPA, setSemester2GPA] = useState(null);
    const [savedGPAs, setSavedGPAs] = useState({ semester1: false, semester2: false });
    const [semester1Modules, setSemester1Modules] = useState([
        { module_name: '', grade: 'A+', credits: 2 }
    ]);
    const [semester, setSemester] = useState("")
    const [semester2Modules, setSemester2Modules] = useState([
        { module_name: '', grade: 'A+', credits: 2 }
    ]);
    const [formData, setFormData] = useState([...semester1Modules, ...semester2Modules])
    const foundationCourses = {
        "A+": 10,
        "A": 10,
        "A-": 9.4,
        "B+": 8.6,
        "B": 8,
        "B-": 7.4,
        "C+": 6.6,
        "C": 6,
        "C-": 5.4,
        "D": 4,
        "E": 0,
        "F": 0 
    }

    const departmentalCourses = {
        "A+": 15,
        "A": 15,
        "A-": 14.1,
        "B+": 12.9,
        "B": 12,
        "B-": 11.1,
        "C+": 9.9,
        "C": 9,
        "C-": 8.1,
        "D": 6,
        "E": 0,
        "F": 0 
    }

    useEffect(() => {
        if (semester === "Semester One"){
            setFormData(semester1Modules)
        } else if (semester === "Semester Two") {
            setFormData(semester2Modules)
        } else {
            setFormData([...semester1Modules, ...semester2Modules])
        }
        setResult("inactive")
    }, [semester, semester1Modules, semester2Modules])

    // HANDLE FORM CHANGE
    const handleChange = (index, event, semesterModules, setSemesterModules) => {
        const values = [...semesterModules];
        if (event.target.name === 'credits') {
            // Ensure credits are converted to numbers
            values[index].credits = parseInt(event.target.value, 10);
        } else {
            values[index][event.target.name] = event.target.value;
        }
        setSemesterModules(values);
    };

    // ADD MODULE FUNCTION
    const handleAddModule = (semesterModules, setSemesterModules) => {
        setSemesterModules([...semesterModules, { module_name: '', grade: 'A+', credits: 2 }]);
    };

    // DELETE MODULE FUNCTION
    const handleDeleteModule = (index, semesterModules, setSemesterModules) => {
        const values = [...semesterModules]; 
        if(values.length > 1){
            values.splice(index, 1);
        }
        setSemesterModules(values);
    };

    const URL = "https://unigpacalculator-api.onrender.com";

    const handleCalculateGpa = async (semester, modules, setGPA) => {
        console.log(formData)
        if(semester === "Semester One") {
            let totalGrades = 0;
            let creditHrs = 0;
            let gpa = 0;
            semester1Modules.map((module) => {
            if (module.credits === 2){
                totalGrades += foundationCourses[`${module.grade}`]
            } else if (module.credits === 3) {
                totalGrades += departmentalCourses[`${module.grade}`]
            }
            creditHrs+=module.credits
            })
            gpa = (totalGrades / creditHrs).toFixed(2)
            setSemester1Score({totalGrade: totalGrades, gpa })
        }else if(semester === "Semester Two") {
            let totalGrades = 0;
            let creditHrs = 0;
            let gpa = 0;
            semester2Modules.map((module) => {
            if (module.credits === 2){
                totalGrades += foundationCourses[`${module.grade}`]
            } else if (module.credits === 3) {
                totalGrades += departmentalCourses[`${module.grade}`]
            }
            creditHrs+=module.credits
            })
            gpa = (totalGrades / creditHrs).toFixed(2)
            setSemester2Score({totalGrade: totalGrades, gpa })
        }else if (semester === "Both Semesters") {
            let totalGrades = 0;
            let creditHrs = 0;
            let gpa = 0;
            formData.map((module) => {
            if (module.credits === 2){
                totalGrades += foundationCourses[`${module.grade}`]
            } else if (module.credits === 3) {
                totalGrades += departmentalCourses[`${module.grade}`]
            }
            creditHrs+=module.credits
            })
            gpa = (totalGrades / creditHrs).toFixed(2)
            setBothSemestersScore({totalGrade: totalGrades, gpa })
        }
        
        // formData.map((module) => {
        //     if (module.credits === 2){
        //         totalGrades += foundationCourses[`${module.grade}`]
        //     } else if (module.credits === 3) {
        //         totalGrades += departmentalCourses[`${module.grade}`]
        //     }
        //     creditHrs+=module.credits
        // })
        // const creditHrs = formData.reduce((module) => module.credits);
        setResult("active")
        // try {
        //     const response = await axios.post(`${URL}/api/gpa/calculate`, 
        //     {
        //         semester,
        //         modules
        //     });
        //     setGPA(response.data.gpa);
        // } catch (error) {
        //     console.error('Error calculating GPA:', error);
        //     setGPA(null); // Reset the GPA to null in case of error
        // }
    };

    // const handleSaveGPA = async (semester, gpa) => {
    //     try {
    //         await axios.post(`${URL}/api/gpa/save`, {
    //             semester,
    //             gpa
    //         });
    //         setSavedGPAs(prev => ({
    //             ...prev,
    //             [`semester${semester}`]: true
    //         }));
    //     } catch (error) {
    //         console.error('Error saving GPA:', error);
    //     }
    // };

    const renderSemester = (semester, modules, setModules, gpa, setGPA) => (
        <div className="">
            <h2 className='font-Montserrat text-xl ml-3 font-bold absolute'>Semester {semester}</h2>
                <div className="flex items-center justify-evenly font-Montserrat">
                    <div className='font-medium'></div>
                    <div className='font-medium relative xs:left-10 sm:left-24 md:left-36'>Grade</div>
                    <div className='font-medium relative xs:left-5 sm:left-10 md:left-12'>Credit Hrs</div>
                </div>
                {modules.map((module, index) => (
                    <div key={index} className='flex items-center justify-center mt-2 font-Montserrat'>
                        <div className='flex flex-col'>
                            <input
                                id='module_name'
                                type="text"
                                name="module_name"
                                placeholder="Module Name"
                                value={module.module_name}
                                onChange={(event) => handleChange(index, event, modules, setModules)}
                                required
                                className='w-[150px] xs:w-[200px] sm:w-[300px] md:w-[330px] border border-[#ccc] rounded-md ml-4 xs:ml-1 font-Montserrat motion-preset-pop motion-duration-1000'
                            />
                        </div>
                        <div className="flex flex-col">
                            
                            <select
                                name="grade"
                                value={module.grade}
                                onChange={(event) => handleChange(index, event, modules, setModules)}
                                className='w-[75px] xs:w-[75px] mx-2 border border-[#ccc] rounded-md font-Montserrat motion-preset-pop motion-duration-1000'
                            >
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
                        <div className='flex flex-col'>
                            <select 
                            name="credits"  
                            value={module.credits}
                            onChange={(event) => handleChange(index, event, modules, setModules)}
                            className='w-[70px] xs:w-[65px] border border-[#ccc] rounded-md motion-preset-pop motion-duration-1000'>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                            </select>
                        </div>
                        <button 
                            type="button" 
                            className="bg-[#ff4444] rounded-full p-1.5 mx-2 motion-preset-pop motion-duration-1500"
                            onClick={() => handleDeleteModule(index, modules, setModules)}
                        >
                            <X className='font-bold text-xl text-white'/>
                        </button>
                        
                    </div>
                ))}
                <div className="mt-5 flex flex-col items-center">
                    <button 
                        type="button" 
                        onClick={() => handleAddModule(modules, setModules)}
                        className='bg-[#c3c7f2] text-blue-500 p-2 mb-3 rounded-3xl'
                    >
                        <Plus />
                    </button>
                </div>
            {gpa !== null && (
                <div className="result mt-4 flex flex-col items-center">
                    <h3>Your GPA: {gpa.toFixed(2)}</h3>
                    {!savedGPAs[`semester${semester}`] && (
                        <button
                            onClick={() => handleSaveGPA(semester, gpa)}
                            className='bg-green-500 text-white py-2 px-5 rounded-md mt-2'
                        >
                            Save GPA
                        </button>
                    )}
                </div>
            )}
        </div>
    );

    return (
        <div className="flex flex-col items-center justify-center relative top-24">
            <select className='text-xl mb-4 border-[#ccc] rounded-md' onChange={(e) => setSemester(e.target.value)}>
                <option>Select Semester</option>
                <option value="Semester One">Semester One</option>
                <option value="Semester Two">Semester Two</option>
                <option value="Both Semesters">Both Semesters</option>
            </select>
            { semester === "Semester One" ? 
            <>
            {renderSemester(1, semester1Modules, setSemester1Modules, semester1GPA, setSemester1GPA)}
            <button type="submit" onClick={() => handleCalculateGpa(semester)} className='bg-[#0056b3] font-Montserrat font-medium text-white py-2 px-5 rounded-md'>Calculate GPA</button>
        </> :
            semester === "Semester Two" ?
            <>
                {renderSemester(2, semester2Modules, setSemester2Modules, semester2GPA, setSemester2GPA)}
                <button type="submit" onClick={() => handleCalculateGpa(semester)} className='bg-[#0056b3] font-Montserrat font-medium text-white py-2 px-5 rounded-md'>Calculate GPA</button>
            </> :
            semester === "Both Semesters" ? 
            <>
                {renderSemester(1, semester1Modules, setSemester1Modules, semester1GPA, setSemester1GPA)}
                {renderSemester(2, semester2Modules, setSemester2Modules, semester2GPA, setSemester2GPA)}
                <button type="submit" onClick={() => handleCalculateGpa(semester)} className='bg-[#0056b3] font-Montserrat font-medium text-white py-2 px-5 rounded-md'>Calculate CGPA</button>
            </> : ""
            }
            <Result formData={formData} result={result} semester={semester} semester1Modules={semester1Modules} semester2Modules={semester2Modules} semester1Score={semester1Score} semester2Score={semester2Score} bothSemestersScore={bothSemestersScore}/>
            
            {savedGPAs.semester1 && savedGPAs.semester2 && (
                <button
                    // onClick={() => router.push('/cgpa')}
                    className='bg-[#0056b3] text-white py-2 px-5 rounded-md mt-4 mb-8'
                >
                    See CGPA
                </button>
            )}
        </div>
    );
};
export default NewCalculation;
