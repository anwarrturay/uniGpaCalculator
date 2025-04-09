import React, { useContext } from 'react'
import { DataContext } from '../context/DataContext'
import { useLocation } from 'react-router-dom';
import { IoSadOutline } from 'react-icons/io5';
import unimakLogo from "../../images/unimak.png"
import {motion} from "framer-motion"

const Loading = () => {
    const location = useLocation();
    const { networkError } = useContext(DataContext);
  
    const handleRefresh = () => {
        location.reload();
    }
  return (
    <div className='flex flex-col items-center justify-center h-[100vh] font-Montserrat'>
        {networkError ? 
            <>
                <div className='text-2xl font-extrabold flex items-center gap-2 font-Montserrat'><p>Ooops</p> <IoSadOutline /></div>
                Check your network connection!
                <button className='underline' onClick={handleRefresh}>Refresh</button>
            </>  :
            <>
                <motion.div
                    className="flex justify-center items-center h-screen"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.img
                        src={unimakLogo}
                        alt="UltraResume Logo"
                        className="w-[100px]"
                        animate={{
                        scale: [1.5, 2, 1.5],
                        }}
                        transition={{
                        duration: 2.5, // Animation duration
                        repeat: Infinity, // Repeat indefinitely
                        ease: "easeInOut", // Smooth easing
                        }}
                    />
                </motion.div>
            </>
        }
    </div>
  )
}

export default Loading;