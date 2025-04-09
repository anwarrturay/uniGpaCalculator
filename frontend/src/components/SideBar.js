import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { Drawer, Sidebar} from "flowbite-react";
import unimakSM from '../images/unimak-sm.png';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { BASE_URL } from '../api/axios';
const sidebar = ({isOpen, handleClose}) => {
  const navigate = useNavigate()
  const { auth, user, setUser } = useAuth();
  const userId = auth?.userId;
  const axiosPrivate = useAxiosPrivate();
  
  useEffect(()=>{
    const fetchUserData = async ()=>{

      if (!userId) {
        console.error("User ID not found in localStorage.");
        return;
      }

      try{
        const response = await axiosPrivate.get(`/users/${userId}`);
        setUser(response.data);
      }catch(err){
        console.error("Error fetching user data:", err);
      }
    }
    fetchUserData();

  }, [userId])


  return (
    <>
      <Drawer open={isOpen} onClose={handleClose}>
        { isOpen &&
          <div className='flex items-center justify-start border-b-2'>
            <img src={unimakSM} alt="" className='w-[50px] h-[50px]'/>
            <Drawer.Header title="University Of Makeni" titleIcon={() => <></>} className='text-center align-middle ml-2 text-lg font-Montserrat'/>
          </div>
        }
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item>
                      <Link to={'/profile'} className='font-Montserrat'>
                        <div className='flex items-center cursor-pointer'>
                          <div className='w-[70px]'>
                            <img src={user && `${BASE_URL}${user?.image}`} className='w-[50px] h-[50px] rounded-full' alt="Profile" />
                          </div>
                          <p className='font-medium ml-3 text-wrap'>{user && `${user?.firstname}  ${user?.lastname}`}</p>
                        </div>
                      </Link>
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item>
                      <Link to={'/recent'} className='cursor-pointer font-Montserrat'>
                        <div className="flex items-center">
                          <div className="rounded-md hover:bg-[#c3c7f2] p-2.5">
                            <FontAwesomeIcon icon={faClock} className='text-3xl text-[#364AFF]'/>
                          </div>
                          <div className='font-medium ml-3'>Recent Calculations</div>  
                        </div>
                      </Link>
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item>
                      <Link to={'/newcalculation'}>
                        <div className="flex items-center cursor-pointer">
                            <div className='bg-[#c3c7f2] hover:bg-[#abb0ed] flex items-center justify-center p-2.5 rounded-md'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#364AFF]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /> 
                              </svg>
                            </div>
                            <div className="text-black text-base ml-3 font-Montserrat font-medium">
                                New Calculation
                            </div>
                        </div>
                      </Link>
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                  {/* LOGOUT SECTION */}
                  <Sidebar.ItemGroup>
                    <Sidebar.Item>
                        <span onClick={()=> navigate('/')}>
                            <div className="flex items-center cursor-pointer relative">
                                <div className='bg-[#c3c7f2] hover:bg-[#abb0ed] flex items-center justify-center p-2.5 rounded-md'>
                                    <LogOut className='size-6 text-[#364AFF]'/>
                                </div>
                                <div className="text-base ml-3 font-Montserrat font-medium">
                                    Log Out
                                </div>
                            </div>
                        </span>
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
  )
}

export default sidebar;
