import React from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashBoard = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center justify-center min-h-screen font-Montserrat'>
      <p className="text-base my-6 font-medium text-wrap text-center">Explore the <span className='font-bold'>Miskul App</span> by starting a new calculation!</p>
      <div 
        onClick={() => navigate('/newcalculation')} 
        className="bg-white px-10 py-16 shadow-xl rounded-md text-white flex flex-col items-center justify-center 
        xs:px-12 xs:py-20 sm:px-16 sm:py-24 md:px-20 md:py-28 lg:px-24 lg:py-32 xl:px-28 xl:py-36"
      >
        <Plus className='text-[#070181] cursor-pointer' size={64} />
      </div>
      <p className='mt-4 text-sm text-center xs:text-base sm:text-lg md:text-xl lg:text-lg xl:text-base font-medium'>
        Start a new calculation
      </p>
    </div>
  );
}

export default DashBoard;