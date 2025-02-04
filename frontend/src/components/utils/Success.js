import React from 'react'
import { useLocation } from 'react-router-dom';
const Success = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname === '/register' ?
      <div className='bg-[#00FF94] flex flex-col items-center justify-center rounded-md font-Montserrat'>
          <div className='text-[#5DC486]'>Registration successful.</div>
      </div>
        : location.pathname === '/' ?
      <div className='bg-[#00FF94] flex flex-col items-center justify-center rounded-md font-Montserrat'>
          <div className='text-[#5DC486]'>Registration successful.</div>
      </div>
      : null
      }
    </>
  )
}

export default Success;