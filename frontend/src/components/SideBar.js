import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { Drawer, Sidebar} from "flowbite-react";
import unimakSM from '../images/unimak-sm.png';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from './context/DataContext';
import Avatar from "../assets/Avatar-boy.jpg"
import axios from 'axios';
const sidebar = ({isOpen, handleClose}) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [imageUrl, setImageUrl] = useState(null)
  const { userId } = useContext(DataContext);
  
  useEffect(()=>{
    const fetchUserData = async ()=>{

      if (!userId) {
        console.error("User ID not found in localStorage.");
        return;
      }

      try{
        const response = await axios.get(`http://localhost:5000/users/${userId}`);
        console.log("API Response:", response.data);
        setUser(response.data);
      }catch(err){
        console.error("Error fetching user data:", err);
      }
    }

    fetchUserData();

  }, [userId])

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:5000/user-image/${userId}`, {
        responseType: "blob", // Get image as a Blob
      })
      .then((response) => {
        const imageBlob = new Blob([response.data]);
        const imageObjectUrl = URL.createObjectURL(imageBlob);
        setImageUrl(imageObjectUrl);
      })
      .catch((error) => console.error("Error loading image:", error));
  }, [userId]);


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
                        <div className='flex items-center justify-between cursor-pointer'>
                          <img src={imageUrl ? imageUrl : Avatar} className='w-[50px] h-[50px] rounded-full' alt="Profile" />
                          <div>{user?.firstname && user.lastname ? `${user?.firstname}  ${user?.lastname}` : "Username"}</div>
                        </div>
                      </Link>
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item>
                      <Link to={'/recent'} className='flex items-center justify-evenly cursor-pointer font-Montserrat'>
                        <div className="flex items-center justify-center rounded-md hover:bg-[#c3c7f2] p-2.5">
                          <FontAwesomeIcon icon={faClock} className='text-3xl text-[#364AFF]'/>
                        </div>
                        <div>Recent Calculations</div>  
                      </Link>
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item>
                      <Link to={'/newcalculation'}>
                        <div className="flex items-center justify-evenly cursor-pointer">
                            <div className='bg-[#c3c7f2] hover:bg-[#abb0ed] flex items-center justify-center p-2.5 rounded-md'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#364AFF]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /> 
                              </svg>
                            </div>
                            <div className="text-black text-base ml-2 font-Montserrat">
                                New Calculation
                            </div>
                        </div>
                      </Link>
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                  {/* LOGOUT SECTION */}
                  <Sidebar.ItemGroup>
                    <Sidebar.Item className='mt-10'>
                        <span onClick={()=> navigate('/')}>
                            <div className="flex items-center justify-evenly cursor-pointer relative right-5">
                                <div className='bg-[#c3c7f2] hover:bg-[#abb0ed] flex items-center justify-center p-2.5 rounded-md'>
                                    <LogOut className='size-6 text-[#364AFF]'/>
                                </div>
                                <div className="text-black text-base ml-2 font-Montserrat">
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
