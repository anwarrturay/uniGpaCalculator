import React from 'react';

const DashBoard = () => {
  return (
    <div className='flex flex-col items-center justify-center relative top-56 lg:flex-row'>
      <div className="bg-[#003459] px-20 py-8  shadow-xl rounded-md text-white mb-2 xs:px-32 xs:py-10">
        <div className='text-lg'>Semester 1 CGPA</div>
        <h1 className='font-medium text-3xl text-center xs:text-[35px]'>3.56</h1> 
      </div>
      <div className="bg-[#003459] px-20 py-8 lg:ml-2 shadow-xl rounded-md text-white xs:px-32 xs:py-10">
        <div className='text-lg'>Semester 2 CGPA</div>
        <h1 className='font-medium text-3xl text-center  xs:text-[35px]'>4.78</h1> 
      </div>
    </div>
  )
}

export default DashBoard;
