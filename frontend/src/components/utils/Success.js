import React from 'react'
import { useLocation } from 'react-router-dom';
const Success = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname === '/register' ?
      <div className='bg-[#00ff9570] flex flex-col items-center justify-center rounded-md font-Montserrat'>
          <div className='text-green-800'>Registration successful.</div>
      </div>
        : location.pathname === '/' ?
      <div className='bg-[#00ff9570] flex flex-col items-center justify-center rounded-md font-Montserrat'>
          <div className='text-green-800'>logged in successful.</div>
      </div>
      : null
      }
    </>
  )
}

export default Success;