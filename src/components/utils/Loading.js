import React, { useContext } from 'react'
import { DataContext } from '../context/DataContext'
import { useLocation } from 'react-router-dom';
import { IoSadOutline } from 'react-icons/io5';

const Loading = ({link}) => {
    const location = useLocation();
    const { networkError } = useContext(DataContext);
  
    const handleRefresh = () => {
        location.reload();
    }
  return (
    <div className='flex flex-col items-center justify-center h-[100vh] font-Montserrat'>
        {networkError ? 
            <>
                <div className='text-2xl font-extrabold flex items-center gap-2'><p>Ooops</p> <IoSadOutline /></div>
                Check your network connection!
                <button className='underline' onClick={handleRefresh}>Refresh</button>
            </>  :
            <>
                <p>Loading, Please wait!</p>
                <div className='overflow-hidden w-[20vw] flex items-center justify-center mt-2'>
                <div className='loading'></div>
                </div>
            </>
        }
    </div>
  )
}

export default Loading;