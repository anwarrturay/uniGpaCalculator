import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Sidebar} from "flowbite-react";
import unimakSM from '../images/unimak-sm.png';
import { LogOut, History, Plus } from 'lucide-react';
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
                          <div className="rounded-md bg-[#07018130] hover:bg-[#07018137] p-2.5">
                            <History size={24} className='text-[#070181]'/>
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
                            <div className='bg-[#07018130] hover:bg-[#07018137] flex items-center justify-center p-2.5 rounded-md'>
                              <Plus className='text-[#070181]'/>
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
                                <div className='flex items-center justify-center p-2.5 rounded-md'>
                                    <LogOut size={24} className='text-red-500'/>
                                </div>
                                <div className="text-base text-red-500 ml-3 font-Montserrat font-medium">
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
