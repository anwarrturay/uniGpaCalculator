import React from 'react';
import SideBar from './SideBar';
import { useLocation, useNavigate } from 'react-router-dom';
import unimakSM from '../images/unimak-sm.png'
import unimakXL from '../images/unimak-xl.png'
import useWindowSize from '../hooks/useWindowSize';
import { Link } from 'react-router-dom';
import { History, ChevronLeft, AlignLeft } from 'lucide-react';
const Header = ({isOpen, setIsOpen, handleClose}) => {
  const location = useLocation();
  const { width } = useWindowSize();
  const mutableStyle = location.pathname === '/studentdashboard' ?
    'justify-between': location.pathname === '/newcalculation' ? 'justify-between': 'justify-between'
  ;
  const navigate = useNavigate()
  return (
    <div className='bg-[#F2F2F2] z-50 fixed top-0 left-0 right-0  h-[70px] shadow-sm'>
      <div className={`flex items-center ${mutableStyle} lg:${mutableStyle} lg:items-start lg:mt-3`}>
        {location.pathname === '/studentdashboard' &&
          <div className="flex items-start justify-start  cursor-pointer" onClick={() => setIsOpen(true)}>
            <AlignLeft size={28} className='ml-2'/>
          </div>
        }
        {location.pathname === '/newcalculation' && 
          <Link to={'/studentdashboard'}>
            <div className='flex items-center font-Montserrat cursor-pointer pl-2'>
            <ChevronLeft size={28} color='#070181'/>
            </div>
          </Link>
        }
        {location.pathname === '/recent' && 
          <div onClick={() => navigate(-1)}>
            <div className='flex items-center font-Montserrat cursor-pointer pl-2'>
            <ChevronLeft size={28} color='#070181'/>
            </div>
          </div>
        }
        {location.pathname === '/contact-us' && (
          <div onClick={() => navigate(-1)}>
            <div className='flex items-center font-Montserrat cursor-pointer pl-2'>
            <ChevronLeft size={28} color='#070181'/>
            </div>
          </div>
        )}
        { 
          width < 768 ?
            <div className="w-[50px] xs:w-[60px] ml-2 mt-3">
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
              
            </div>
          : location.pathname === '/recent' ? 
          (
            <div className='font-[500] font-Montserrat flex items-center justify-center text-xl text-center mr-3 xs:text-3xl'>
              
            </div> 
          ):(
            location.pathname === '/newcalculation' ? (
            <Link to={'/recent'} className='bg-[#07018130] hover:bg-[#07018137] font-[500] font-Montserrat flex items-center rounded-md justify-center text-xl mr-3 xs:text-xl lg:text-2xl bg-[#c3c7f2] hover:bg-[#abb0ed] p-2.5'>
              <History className='text-2xl text-[#070181]'/>
            </Link>
            ) : (
              <div></div>
            )
          ) 
        }
      </div>
    </div>
  )
}

export default Header;
