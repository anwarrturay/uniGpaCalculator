import React, { useState, useEffect } from 'react';
import { X, Plus } from "lucide-react";
import Result from './Result';
import SaveResultDialog from './utils/SaveResultDialog';
// import { useRouter } from 'next/router';

const NewCalculation = () => {
    // USESTATES
    const [result, setResult] = useState("inactive");
    const [showDialog, setShowDialog] = useState(false)
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
        const calculateSem1 = () => {
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
        }
        const calculateSem2 = () => {
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
        }
        if(semester === "Semester One") {
            calculateSem1();
        }else if(semester === "Semester Two") {
            calculateSem2();
        }else if (semester === "Both Semesters") {
            calculateSem1();
            calculateSem2()
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
        setResult("active")
        setTimeout(()=>{
            setShowDialog(true)
        }, 5000);
    };

    const renderSemester = (semester, modules, setModules, gpa, setGPA) => (
        <div className="relative">
            <h2 className='font-Montserrat text-lg ml-2 font-bold absolute'>Semester {semester}</h2>
                <div className="flex items-center justify-evenly font-Montserrat">
                    <div className='font-medium'></div>
                    <div className='font-medium relative left-10 xs:left-20 sm:left-32 md:left-36'>Grade</div>
                    <div className='font-medium relative left-2 xs:left-7 sm:left-12 md:left-16'>Credit Hrs</div>
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
                                className='w-[100px] xxs:w-[140px] text-sm xs:w-[200px] sm:w-[300px] md:w-[330px] border border-[#ccc] rounded-md xs:ml-1 font-Montserrat motion-preset-pop motion-duration-1000'
                            />
                        </div>
                        <div className="flex flex-col">
                            
                            <select
                                name="grade"
                                value={module.grade}
                                onChange={(event) => handleChange(index, event, modules, setModules)}
                                className='w-[73px] xs:w-[75px] mx-2 border border-[#ccc] rounded-md font-Montserrat motion-preset-pop motion-duration-1000'
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
                            className='w-[65px] xs:w-[65px] border border-[#ccc] rounded-md motion-preset-pop motion-duration-1000'>
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
        </div>
    );

    return (
        <div className="flex flex-col w-full p-5 items-center justify-center relative top-20">
            <h2 className='font-bold pb-2 text-center font-Montserrat'>Please select a semester<br></br>to proceed with calculation!</h2>
            <select className='text-sm mb-4 border-[#ccc] rounded-md font-Montserrat' onChange={(e) => setSemester(e.target.value)}>
                <option>Select Semester</option>
                <option value="Semester One">Semester One</option>
                <option value="Semester Two">Semester Two</option>
                <option value="Both Semesters">Both Semesters</option>
            </select>
            { semester === "Semester One" && result !== "active" ? 
            <>
            {renderSemester(1, semester1Modules, setSemester1Modules, semester1GPA, setSemester1GPA)}
            <button type="submit" onClick={() => handleCalculateGpa(semester)} className='bg-[#070181] font-Montserrat font-medium text-white py-2 px-5 rounded-md'>Calculate GPA</button>
        </> :
            semester === "Semester Two" && result !== "active" ?
            <>
                {renderSemester(2, semester2Modules, setSemester2Modules, semester2GPA, setSemester2GPA)}
                <button type="submit" onClick={() => handleCalculateGpa(semester)} className='bg-[#070181] font-Montserrat font-medium text-white py-2 px-5 rounded-md'>Calculate GPA</button>
            </> :
            semester === "Both Semesters" && result !== "active" ? 
            <>
                {renderSemester(1, semester1Modules, setSemester1Modules, semester1GPA, setSemester1GPA)}
                {renderSemester(2, semester2Modules, setSemester2Modules, semester2GPA, setSemester2GPA)}
                <button type="submit" onClick={() => handleCalculateGpa(semester)} className='bg-[#070181] font-Montserrat font-medium text-white py-2 px-5 rounded-md'>Calculate CGPA</button>
            </> : ""
            }
            <Result formData={formData} result={result} semester={semester} semester1Modules={semester1Modules} semester2Modules={semester2Modules} semester1Score={semester1Score} semester2Score={semester2Score} bothSemestersScore={bothSemestersScore} setResult={setResult}/>
            {
                showDialog && <SaveResultDialog setShowDialog={setShowDialog}/>
            }
            
            
        </div>
    );
};
export default NewCalculation;
