import React from 'react'
import Header from "./Header";
import DashBoard from "./DashBoard";
import SideBar from './SideBar';
const StudentDashBoard = ({isOpen, setIsOpen, handleClose}) => {
  return (
    <>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} handleClose={handleClose} />
        <DashBoard isOpen={isOpen} setIsOpen={setIsOpen} />
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} handleClose={handleClose}/>
    </>
  )
}

export default StudentDashBoard