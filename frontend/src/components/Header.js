import React from 'react';
import SideBar from './SideBar';
import { useLocation } from 'react-router-dom';
import unimakSM from '../images/unimak-sm.png'
import unimakXL from '../images/unimak-xl.png'
import useWindowSize from '../hooks/useWindowSize';
import { Link } from 'react-router-dom';
import { History } from 'lucide-react';
const Header = ({isOpen, setIsOpen, handleClose}) => {
  const location = useLocation();
  const { width } = useWindowSize();
  const mutableStyle = location.pathname === '/studentdashboard' ?
    'justify-between': location.pathname === '/newcalculation' ? 'justify-between': 'justify-between'
  ;
  return (
    <div className='bg-[#F2F2F2] z-50 fixed top-0 left-0 right-0  h-[70px]'>
      <div className={`flex items-center ${mutableStyle} lg:${mutableStyle} lg:items-start lg:mt-3`}>
        {location.pathname === '/studentdashboard' &&
          <div className="flex items-start justify-start  cursor-pointer" onClick={() => setIsOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 xs:size-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
              </svg>
          </div>
        }
        {location.pathname === '/newcalculation' && 
          <Link to={'/studentdashboard'}>
            <div className='flex items-center font-Montserrat'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
              <div className='font-medium text-[19px] xs:text-xl'>Back</div>
            </div>
          </Link>
        }
        { 
          width < 768 ?
            <div className="w-[50px] xs:w-[60px] ml-2">
              <img src={unimakSM} alt="" />
            </div>
          : width < 992 ?
            <div className="w-[50px] md:w-[135px] md:mt-3 ml-2">
              <img src={unimakXL} alt="" />
            </div>
          :  
            <div className="w-[150px]  flex items-center ml-2 lg:items-start">
              <img src={unimakXL} alt="" />
            </div>
        }

        { location.pathname === '/studentdashboard' && <SideBar isOpen={isOpen} setIsOpen={setIsOpen} handleClose={handleClose}/>}

        {location.pathname === '/studentdashboard' ? 
            <div className='font-[500] font-Montserrat flex items-center justify-center text-xl text-center mr-3 xs:text-3xl'>
              DashBoard
            </div>
          :
            <Link to={'/recent'} className='font-[500] font-Montserrat flex items-center rounded-md justify-center text-xl mr-3 xs:text-xl lg:text-2xl bg-[#c3c7f2] hover:bg-[#abb0ed] p-2.5'>
              <History className='text-2xl text-[#364AFF]'/>
            </Link>
        }
      </div>
    </div>
  )
}

export default Header;
