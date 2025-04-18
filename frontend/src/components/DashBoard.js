import React, {useEffect} from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const DashBoard = () => {
  const navigate = useNavigate();
  const {auth, user, setUser} = useAuth();
  const {userId} = auth;
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
  }, [])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen font-Montserrat'>
      <p>Hi <span className='font-semibold'>{user?.firstname},</span></p>
      <p className="text-base font-medium text-wrap text-center">Explore the <span className='font-bold'>Miskul App</span></p>
      <p className='mb-3'>by starting a new calculation!</p>
      <div 
        onClick={() => navigate('/newcalculation')} 
        className="bg-white px-10 py-16 shadow-xl rounded-md text-white flex flex-col items-center justify-center 
        xs:px-12 xs:py-20 sm:px-16 sm:py-24 md:px-20 md:py-28 lg:px-24 lg:py-32 xl:px-28 xl:py-36"
      >
        <Plus className='text-[#070181] cursor-pointer' size={64} />
      </div>
    </div>
  );
}

export default DashBoard;