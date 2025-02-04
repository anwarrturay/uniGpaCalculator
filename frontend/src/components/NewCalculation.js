
import { Label, Select } from "flowbite-react";
import React, { useState } from "react";
// "use client"

import React, { useState } from 'react';
import axios from 'axios';
import { X, Plus } from "lucide-react"
// import { useRouter } from 'next/router';

const NewCalculation = () => {
    // const router = useRouter();
    const [semester1Modules, setSemester1Modules] = useState([
        { module_name: '', grade: 'A+', credits: 2 }
    ]);
    const [semester2Modules, setSemester2Modules] = useState([
        { module_name: '', grade: 'A+', credits: 2 }
    ]);
    const [semester1GPA, setSemester1GPA] = useState(null);
    const [semester2GPA, setSemester2GPA] = useState(null);
    const [savedGPAs, setSavedGPAs] = useState({ semester1: false, semester2: false });

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

  
    setModules(updatedModules);
  };

  const handleClick = (e) => {
    e.preventDefault();
    addNewItem();
    setModules([...modules, { module_name: '', grade: 'A+', credits: 2 }]);
  };

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
  };

  // const addNewItem = ()=>{
  //   const id = inputList.length ? inputList[inputList.length - 1].id + 1 : 1;
  //   const item = inputList[0].input;
  //   console.log(item);
  //   const newInputItem = {id, item};
  //   console.log(newInputItem);
  //   const newArray = [...inputList, newInputItem];
  //   setInputList(newArray);
  // }
  
  const addNewItem = () => {
    const id = inputList.length ? inputList[inputList.length - 1].id + 1 : 1;
    const newInput = (
      <>
        <input 
          className='w-[100px] border-gray-300 outline-none rounded-md' 
          type="text" 
          placeholder='Module'
          onChange={(e) => handleModuleChange(inputList.length, 'module_name', e.target.value)}
        />
        <Select 
          defaultValue="A+" 
          className='w-[70px]' 
          required
          onChange={(e) => handleModuleChange(inputList.length, 'grade', e.target.value)}
        >
          <option>A+</option>
          <option>A</option>
          <option>A-</option>
          <option>B+</option>
          <option>B</option>
          <option>B-</option>
          <option>C+</option>
          <option>C</option>
          <option>C-</option>
          <option>D</option>
          <option>E</option>
          <option>F</option>
        </Select>
        <Select 
          className='cursor-pointer w-[70px]' 
          defaultValue="2" 
          required
          onChange={(e) => handleModuleChange(inputList.length, 'credits', parseInt(e.target.value))}
        >
          <option>2</option>
          <option>3</option>
        </Select>
      </>
    );
  
    const newInputItem = { id, input: newInput };
    setInputList([...inputList, newInputItem]);
  };

  const handleSaveCalculation = async () => {
    try {
      const response = await fetch('/api/gpa/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_year: '2023',
          semester: selectedSemester,
          modules,
        }),
      });
      const data = await response.json();
      console.log('Calculation saved successfully:', data);
    } catch (error) {
      console.error('Error saving calculation:', error);
    }
  };


    
    const handleAddModule = (semesterModules, setSemesterModules) => {
        setSemesterModules([...semesterModules, { module_name: '', grade: 'A+', credits: 2 }]);
    };


    const handleDeleteModule = (index, semesterModules, setSemesterModules) => {
        const values = [...semesterModules]; 
        if(values.length > 1){
            values.splice(index, 1);
        }
        setSemesterModules(values);
    };

    const handleCalculateGpa = async (semester, modules, setGPA) => {
        try {
            const response = await axios.post('http://localhost:5000/api/gpa/calculate', {
                semester,
                modules
            });
            setGPA(response.data.gpa);
        } catch (error) {
            console.error('Error calculating GPA:', error);
            setGPA(null); // Reset the GPA to null in case of error
        }
    };

    const handleSaveGPA = async (semester, gpa) => {
        try {
            await axios.post('http://localhost:5000/api/gpa/save', {
                semester,
                gpa
            });
            setSavedGPAs(prev => ({
                ...prev,
                [`semester${semester}`]: true
            }));
        } catch (error) {
            console.error('Error saving GPA:', error);
        }
    };

    const renderSemester = (semester, modules, setModules, gpa, setGPA) => (
        <div className="mb-10">
            <h2 className='font-medium font-Montserrat text-xl'>Semester {semester}</h2>
                <div className="flex items-center justify-evenly font-Montserrat mt-3">
                    <div className='font-medium'>Module</div>
                    <div className='font-medium relative xs:left-10 sm:left-24 md:left-28'>Grade</div>
                    <div className='font-medium relative xs:left-5 sm:left-10 md:left-12'>Credit Hrs</div>
                </div>
                {modules.map((module, index) => (
                    <div key={index} className='flex items-center justify-center mt-3 font-Montserrat'>
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
                    <button 
                        type="submit"
                        onClick={() => handleCalculateGpa(semester, modules, setGPA)}
                        className='bg-[#0056b3] font-Montserrat font-medium text-white py-2 px-5 rounded-md'
                    >Calculate GPA</button>
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
            {renderSemester(1, semester1Modules, setSemester1Modules, semester1GPA, setSemester1GPA)}
            {renderSemester(2, semester2Modules, setSemester2Modules, semester2GPA, setSemester2GPA)}
            
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