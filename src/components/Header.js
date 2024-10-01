import React from 'react';
import { Button, Drawer, Sidebar, TextInput } from "flowbite-react";
import { useState } from 'react';
import SideBar from './SideBar';
import { useLocation } from 'react-router-dom';
import unimakSM from '../images/unimak-sm.png'
import unimakXL from '../images/unimak-xl.png'

const Header = ({isOpen, setIsOpen, handleClose}) => {
  const location = useLocation();
  return (
    <div className='bg-[#F2F2F2] flex justify-between p-2.5 z-50 fixed top-0 left-0 right-0'>
      <div className="flex items-start justify-start  cursor-pointer" onClick={() => setIsOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
          </svg>
      </div>
      {/* <div className="lg:w-[40px] h-[40px]">
        <img src={unimakXL} alt="" />
      </div>
      <div className="sm: w-[50px] h-[50px]">
        <img src={unimakSM} alt="" />
      </div> */}
      { location.pathname === '/studentdashboard' && <SideBar isOpen={isOpen} setIsOpen={setIsOpen} handleClose={handleClose}/>}
      <div className='font-[500] flex items-center justify-center text-xl text-center ml-2'>
        Student DashBoard
      </div>
    </div>
  )
}

export default Header;
