import React, { useState } from "react";
import { Label, Select } from "flowbite-react";
const NewCalculation = () => {
  const [mod, setModule] = useState("");
  const [grade, setGrade] = useState("");
  const [creditHrs, setCreditHrs] = useState("");
  const [inputsValue, setInputsValue] = useState([
    {id:1, module: "Golang", grade: "A+", creditHrs: "3"}
  ]);
  const [inputList, setInputList] = useState([{
    id: 1,
    input: 
    <>
    <input 
      className='w-[100px] border-gray-300 outline-none rounded-md' 
      id="small" 
      type="text"
      onChange={(e)=> setModule(e.target.value)}
      placeholder='Module'/>
    <Select 
      defaultValue="A+" 
      className='w-[70px]' 
      id="semester" 
      onChange={(e)=> setGrade(e.target.value)}
      required>
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
      id="semester" 
      defaultValue="2" 
      onChange={(e)=> setCreditHrs(e.target.value)}
      required>)
      <option>2</option>
      <option>3</option>
    </Select>
    </>
  }]);

  const handleInputValue = ()=>{
    const id = inputsValue.length ? inputsValue[inputsValue.length -1].id + 1 : 1;
    const inpValue = inputsValue.id === inputList.id ? {id, module: mod, grade, creditHrs} : '';
    console.log(inpValue)
    setInputsValue(inpValue);
    console.log(inputsValue);
  }

  const handleClick = (e)=>{
    e.preventDefault();
    addNewItem();
  }

  const addNewItem = ()=>{
    const id = inputList.length ? inputList[inputList.length - 1].id + 1 : 1;
    const input = inputList[0].input;
    const newInputItem = {id, input};
    const newArray = [...inputList, newInputItem];
    setInputList(newArray);
  }

  return (
    <main className='flex flex-col items-center justify-center mt-16'>
      <form action="" className='flex flex-col mt-4'>
        <div className='font-medium text-xl text-center'>New Calculation</div>
        <div className="max-w-md mt-2 ">
          <div className="mb block">
            <Label htmlFor="semesters" value="Select your Semester" />
          </div>
          <Select className='cursor-pointer w-[300px]' id="semester" required>
            <option>Semester 1</option>
            <option>Semester 2</option>
          </Select>
          <div className="flex items-center mt-2 font-medium justify-between">
            <div>Module</div>
            <div>Grade</div>
            <div>Credit Hrs</div>
          </div>

          {/* LIST OF INPUTS  */}
          {inputList.map(item=> 
            <div className="flex items-center justify-between mt-8" key={item.id}>
              {item.input}
            </div>
          )}

        </div>
      </form>
      <div className="flex items-center justify-between m-1 w-[300px]">
        <button 
        className="bg-[#364AFF] px-4 py-2 text-base font-bold border-none cursor-pointer text-white mt-8 rounded-md"
        onClick={handleInputValue}>
            Calculate
        </button>
        <button className="flex items-center justify-center ml-5 cursor-pointer" onClick={handleClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-[#364AFF] relative top-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
      </div>
    </main>
  )
}

export default NewCalculation

