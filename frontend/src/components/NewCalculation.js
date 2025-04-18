import React, { useState, useEffect } from 'react';
import { X, Plus, LoaderCircle } from "lucide-react";
import Result from './Result';
import SaveResultDialog from './utils/SaveResultDialog';
import Failure from './utils/Failure';
// import { useRouter } from 'next/router';

const NewCalculation = () => {
    // USESTATES
    const [isCalculating, setIsCalculating] = useState(false)
    const [result, setResult] = useState("inactive");
    const [error, setError] = useState(null);
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
    const [semester1Modules, setSemester1Modules] = useState([
        { module_name: '', grade: 'A+', credits: 2 }
    ]);
    const [semester, setSemester] = useState("")
    const [semester2Modules, setSemester2Modules] = useState([
        { module_name: '', grade: 'A+', credits: 2 }
    ]);
    const [formData, setFormData] = useState([...semester1Modules, ...semester2Modules])
    const oneCHrs = {
        "A+": 5,
        "A": 5,
        "A-": 4.7,
        "B+": 4.3,
        "B": 4,
        "B-": 3.7,
        "C+": 3.3,
        "C": 3,
        "C-": 2.7,
        "D": 2.3,
        "E": 1,
        "F": 0,
        "F/A+": 5,
        "F/A": 5,
        "F/A-": 4.7,
        "F/B+": 4.3,
        "F/B": 4,
        "F/B-": 3.7,
        "F/C+": 3.3,
        "F/C": 3,
        "F/C-": 2.7,
        "F/D": 2.3,
        "F/E": 1,
        "F/F": 0,
    }
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
        "E": 2,
        "F": 0, 
        "F/A+": 10,
        "F/A": 10,
        "F/A-": 9.4,
        "F/B+": 8.6,
        "F/B": 8,
        "F/B-": 7.4,
        "F/C+": 6.6,
        "F/C": 6,
        "F/C-": 5.4,
        "F/D": 4,
        "F/E": 2,
        "F/F": 0, 
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
        "E": 3,
        "F": 0, 
        "F/A+": 15,
        "F/A": 15,
        "F/A-": 14.1,
        "F/B+": 12.9,
        "F/B": 12,
        "F/B-": 11.1,
        "F/C+": 9.9,
        "F/C": 9,
        "F/C-": 8.1,
        "F/D": 6,
        "F/E": 3,
        "F/F": 0, 
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
        let calError = null;
        if(semester === "Semester One"){
            semester1Modules.forEach(module => {
              if(module.module_name === ""){
                setError("Assign a name for each module");
                calError = true;
              };
              return;  
            });
        }
        if(semester === "Semester Two"){
            semester2Modules.forEach(module => {
              if(module.module_name === ""){
                setError("Assign a name for each module");
                calError = true;
              };
              return;  
            });
        }
        if(semester === "Both Semesters"){
            formData.forEach(module => {
              if(module.module_name === ""){
                setError("Assign a name for each module");
                calError = true;
              };
              return;  
            });
        }
        if (calError) return;
        setIsCalculating(true)
        const calculateSem1 = () => {
            let totalGrades = 0;
            let creditHrs = 0;
            let gpa = 0;
            semester1Modules.map((module) => {
            if (module.credits === 2){
                if(module.grade.includes("F/")){
                    totalGrades += (foundationCourses[`${module.grade}`]/2)
                } else {
                    totalGrades += foundationCourses[`${module.grade}`]
                }
            } else if (module.credits === 3) {
                if(module.grade.includes("F/")){
                    totalGrades += (departmentalCourses[`${module.grade}`]/2)
                } else {
                    totalGrades += departmentalCourses[`${module.grade}`]
                }
            } else if (module.credits === 1) {
                if(module.grade.includes("F/")){
                    totalGrades += (oneCHrs[`${module.grade}`]/2)
                } else {
                    totalGrades += oneCHrs[`${module.grade}`]
                }
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
                    if(module.grade.includes("F/")){
                        totalGrades += (foundationCourses[`${module.grade}`]/2)
                    } else {
                        totalGrades += foundationCourses[`${module.grade}`]
                    }
                } else if (module.credits === 3) {
                    if(module.grade.includes("F/")){
                        totalGrades += (departmentalCourses[`${module.grade}`]/2)
                    } else {
                        totalGrades += departmentalCourses[`${module.grade}`]
                    }
                } else if (module.credits === 1) {
                    if(module.grade.includes("F/")){
                        totalGrades += (oneCHrs[`${module.grade}`]/2)
                    } else {
                        totalGrades += oneCHrs[`${module.grade}`]
                    }
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
                    if(module.grade.includes("F/")){
                        totalGrades += (foundationCourses[`${module.grade}`]/2)
                    } else {
                        totalGrades += foundationCourses[`${module.grade}`]
                    }
                } else if (module.credits === 3) {
                    if(module.grade.includes("F/")){
                        totalGrades += (departmentalCourses[`${module.grade}`]/2)
                    } else {
                        totalGrades += departmentalCourses[`${module.grade}`]
                    }
                } else if (module.credits === 1) {
                    if(module.grade.includes("F/")){
                        totalGrades += (oneCHrs[`${module.grade}`]/2)
                    } else {
                        totalGrades += oneCHrs[`${module.grade}`]
                    }
                }
                creditHrs+=module.credits
            })
            gpa = (totalGrades / creditHrs).toFixed(2)
            setBothSemestersScore({totalGrade: totalGrades, gpa })
        }
        setTimeout(()=> {
            setIsCalculating(false)
            setResult("active")
        }, 1500)
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
                                className='w-[100px] xxs:w-[140px] text-sm xs:w-[200px] sm:w-[300px] md:w-[330px] border border-[#ccc] rounded-md xs:ml-1 font-Montserrat motion-preset-pop motion-duration-1000 outline-none'
                            />
                        </div>
                        <div className="flex flex-col">
                            
                            <select
                                name="grade"
                                value={module.grade}
                                onChange={(event) => handleChange(index, event, modules, setModules)}
                                className='w-[73px] xs:w-[75px] mx-2 border border-[#ccc] rounded-md font-Montserrat motion-preset-pop motion-duration-1000 text-sm'
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
                                <option value={'F/A+'}>F/A+</option>
                                <option value={'F/A'}>F/A</option>
                                <option value={'F/A-'}>F/A-</option>
                                <option value={'F/B+'}>F/B+</option>
                                <option value={'F/B'}>F/B</option>
                                <option value={'F/B-'}>F/B-</option>
                                <option value={'F/C+'}>F/C+</option>
                                <option value={'F/C'}>F/C</option>
                                <option value={'F/C-'}>F/C-</option>
                                <option value={'F/D'}>F/D</option>
                                <option value={'F/E'}>F/E</option>
                                <option value={'F/F'}>F/F</option>
                            </select>
                            {/* Grade: {module.grade} */}
                        </div>
                        <div className='flex flex-col'>
                            <select 
                            name="credits"  
                            value={module.credits}
                            onChange={(event) => handleChange(index, event, modules, setModules)}
                            className='text-sm w-[65px] xs:w-[65px] border border-[#ccc] rounded-md motion-preset-pop motion-duration-1000'>
                                <option value={1}>1</option>
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
        <div className="flex flex-col w-full p-5 items-center justify-center relative top-16">
            <h2 className='font-bold pb-2 text-center font-Montserrat'>Please select a semester<br></br>to proceed with calculation!</h2>
            <select className='text-sm mb-4 border-[#ccc] rounded-md font-Montserrat cursor-pointer' onChange={(e) => setSemester(e.target.value)}>
                <option>Select Semester</option>
                <option className='cursor-pointer' value="Semester One">Semester One</option>
                <option className='cursor-pointer' value="Semester Two">Semester Two</option>
                <option className='cursor-pointer' value="Both Semesters">Both Semesters</option>
            </select>
            { semester === "Semester One" && result !== "active" ? 
            <>
            {renderSemester(1, semester1Modules, setSemester1Modules, semester1GPA, setSemester1GPA)}
            {error && <p>{<Failure errMsg={error} setErrMsg={setError}/>}</p>}
            <button type="submit" onClick={() => handleCalculateGpa(semester)} className='bg-[#070181] font-Montserrat font-medium text-white py-2 px-5 rounded-md'>{isCalculating ? <div className='flex gap-2'><div className='animate-spin'><LoaderCircle /></div><>Calculating...</></div> : "Calculate CGPA"}</button>
        </> :
            semester === "Semester Two" && result !== "active" ?
            <>
                {renderSemester(2, semester2Modules, setSemester2Modules, semester2GPA, setSemester2GPA)}
                {error && <p>{<Failure errMsg={error} setErrMsg={setError}/>}</p>}
                <button type="submit" onClick={() => handleCalculateGpa(semester)} className='bg-[#070181] font-Montserrat font-medium text-white py-2 px-5 rounded-md'>{isCalculating ? <div className='flex gap-2'><div className='animate-spin'><LoaderCircle /></div><>Calculating...</></div> : "Calculate CGPA"}</button>
            </> :
            semester === "Both Semesters" && result !== "active" ? 
            <>
                {renderSemester(1, semester1Modules, setSemester1Modules, semester1GPA, setSemester1GPA)}
                {renderSemester(2, semester2Modules, setSemester2Modules, semester2GPA, setSemester2GPA)}
                {error && <p>{<Failure errMsg={error} setErrMsg={setError}/>}</p>}
                <button type="submit" onClick={() => handleCalculateGpa(semester)} className='bg-[#070181] font-Montserrat font-medium text-white py-2 px-5 rounded-md'>{isCalculating ? <div className='flex gap-2'><div className='animate-spin'><LoaderCircle /></div><>Calculating...</></div> : "Calculate CGPA"}</button>
            </> : ""
            }
            <Result formData={formData} result={result} semester={semester} semester1Modules={semester1Modules} semester2Modules={semester2Modules} semester1Score={semester1Score} semester2Score={semester2Score} bothSemestersScore={bothSemestersScore} setResult={setResult} setShowDialog={setShowDialog}/>
            {/* {
                showDialog && result === "active" && <SaveResultDialog setShowDialog={setShowDialog}/>
            } */}
        </div>
    );
};
export default NewCalculation;
