import React from 'react';

const DashBoard = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen lg:flex-row'>
      <div className="bg-indigo-500 px-20 py-8 mb-2 shadow-md rounded-md">
        <div className='text-lg'>Semester 1 CGPA</div>
        <h1 className='font-medium text-3xl text-center'>3.56</h1> 
      </div>
      <div className="bg-indigo-500 px-20 py-8 lg:ml-2 shadow-md rounded-md">
        <div className='text-lg'>Semester 2 CGPA</div>
        <h1 className='font-medium text-3xl text-center'>4.78</h1> 
      </div>
    </div>
  )
}

export default DashBoard;
