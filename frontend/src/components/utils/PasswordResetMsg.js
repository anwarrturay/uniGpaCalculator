import React from 'react'
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
const PasswordResetMsg = () => {
  return (
    <section>
        <div className="flex items-center gap-4 bg-[#00ff9570] rounded-sm w-[300px] xs:w-[330px] sm:w-[360px] p-2 mb-2">
            <div className="flex items-center bg-green-500 rounded-full p-1">
                <Check className='text-white'/>
            </div>
            <div className="flex text-sm text-wrap">
                <div className="text-base text-green-800 font-medium">
                    Password reset successfully. 
                    <Link to={'/'} className='ml-1 text-blue-500 font-medium gap-4 hover:underline'>Login here</Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default PasswordResetMsg