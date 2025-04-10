import React from 'react'
import { FaChevronLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import updateInfoSchema from '../schemas/updateInfoSchema';

const ProfileHeader = ({id, pageTitle, userImage}) => {

  const { watch, formState: {errors}} = useForm({
    resolver: yupResolver(updateInfoSchema)
  })

  return (
    <header className='relative font-Montserrat'>
        <div className='header bg-[#070181] w-full h-32 text-xl text-white p-2'>
            <h1 className='text-center font-bold'>{pageTitle || 'Profile'}</h1>
            <div className='flex items-center justify-between -translate-y-7'>
                <p className='hover:cursor-pointer'><Link to={"/studentdashboard"}><FaChevronLeft /></Link></p>
                <p className='text-lg'>{id ? `ID: ${id}` : null}</p>
            </div>
            
        </div>
        <div className='absolute overflow-clip w-full top-14'>
            <img 
              className='w-[80px] h-[80px] object-cover object-top rounded-full m-auto' 
              src={userImage} 
              width='100px' 
              alt="Profile" 
            />
        </div>
    </header>
  )
}

export default ProfileHeader;

