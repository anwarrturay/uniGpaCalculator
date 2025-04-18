import React, { useEffect } from 'react';
import SideBar from './SideBar';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import unimakSM from '../images/unimak-sm.png';
import unimakXL from '../images/unimak-xl.png';
import miskulXL from '../images/miskul_icon.png';
import miskulWM from '../images/miskul_wordmark.png';
import useWindowSize from '../hooks/useWindowSize';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import { History, ChevronLeft, AlignLeft, LogOut } from 'lucide-react';

const Header = ({ isOpen, setIsOpen, handleClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const { auth, user, setUser } = useAuth();
  const { userId } = auth;
  const axiosPrivate = useAxiosPrivate();

  // Determine flex styling based on route
  const mutableStyle = 'justify-between';


  // Fetching User personal details
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        console.error("User ID not found in localStorage.");
        return;
      }
      try {
        const response = await axiosPrivate.get(`/users/${userId}`);
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUserData();
  }, []);

  // Logout function
  const logout = async () => {
    try {
      await axiosPrivate.get('/logout');
      setUser(null);
      navigate('/master_domot');
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className='bg-[#F2F2F2] z-50 fixed top-0 left-0 right-0 h-[70px] shadow-sm'>
      <div className={`flex items-center ${mutableStyle} lg:${mutableStyle} lg:items-start lg:mt-3`}>
        
    
        {location.pathname === '/studentdashboard' && (
          <div className="flex items-start justify-start cursor-pointer mt-[0.35rem]" onClick={() => setIsOpen(true)}>
            <AlignLeft size={28} className='ml-2' />
          </div>
        )}

        {location.pathname === '/master_ose' && (
          <div className="flex items-start justify-start cursor-pointer mt-[0.35rem] font-Montserrat font-bold text-lg ml-4 text-black">
            {user?.firstname}
          </div>
        )}

        {['/newcalculation', '/recent', '/contact-us'].includes(location.pathname) && (
          <div onClick={() => navigate(-1)}>
            <div className='flex items-center font-Montserrat cursor-pointer pl-2 md:mt-1 lg:mt-2'>
              <ChevronLeft size={28} className="text-[#070181]"/>
            </div>
          </div>
        )}

       
        {width < 768 ? (
          <div className='flex gap-2 items-center mt-[0.35rem]'>
            <div className="w-[50px] xs:w-[50px]">
              <img src={miskulXL} alt="" />
            </div>
            <div className="w-[60px]">
              <img src={unimakSM} alt="" />
            </div>
          </div>
        ) : width < 992 ? (
          <div className='flex gap-2 items-center'>
            <div className="w-[50px] md:w-[50px] md:mt-3 ml-2">
              <img src={miskulXL} alt="" />
            </div>
            <div className="w-[50px] md:w-[135px] md:mt-3 ml-2">
              <img src={unimakXL} alt="" />
            </div>
          </div>
        ) : (
          <div className='flex gap-2 items-center'>
            <div className="w-[50px] flex items-center ml-2 lg:items-start">
              <img src={miskulXL} alt="" />
            </div>
            <div className="w-[150px] flex items-center ml-2 lg:items-start">
              <img src={unimakXL} alt="" />
            </div>
          </div>
        )}

        {/* Sidebar */}
        {location.pathname === '/studentdashboard' && (
          <SideBar isOpen={isOpen} setIsOpen={setIsOpen} handleClose={handleClose} />
        )}

        {/* Right Side Logic */}
        {location.pathname === '/studentdashboard' ? (
          <div className='font-[500] font-Montserrat flex items-center justify-center text-sm text-center mr-3 xs:text-lg md:mt-2'>
            <p>Hi <strong>{user && user?.firstname}</strong></p>
          </div>
        ) : location.pathname === '/recent' ? (
          <div className='font-[500] font-Montserrat flex items-center justify-center text-xl text-center mr-3 xs:text-3xl'>

          </div>
        ) : location.pathname === '/master_ose' ? (
          <span onClick={logout} className='cursor-pointer mr-4 lg:mt-2'>
            <div className="flex items-center relative">
              <div className="text-base text-red-500 font-Montserrat font-bold hover:opacity-85">
                Log Out
              </div>
            </div>
          </span>
        ) : location.pathname === '/newcalculation' ? (
          <Link to={'/recent'} className='bg-[#07018130] hover:bg-[#07018137] font-[500] font-Montserrat flex items-center rounded-md justify-center text-xl mr-3 xs:text-xl lg:text-2xl bg-[#c3c7f2] hover:bg-[#abb0ed] p-2.5'>
            <History className='text-2xl text-[#070181]' />
          </Link>
        ) : (
          <div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
