import React, { useEffect } from 'react'
import ProfileHeader from './ProfileHeader'
import ProfileFotter from './ProfileFotter'
import { useNavigate } from 'react-router-dom'
import Loading from './utils/Loading'
import useAuth from '../hooks/useAuth'
import { BASE_URL } from '../api/axios'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
const UserProfile = () => {
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate()

    const moveToEditProfile = () => {
        navigate('/profile/edit')
    }
    const {user, setUser, auth, loading} = useAuth();
    const userId = auth?.userId

    useEffect(()=>{
        const fetchUserData = async ()=>{
    
          if (!userId) {
            console.error("User ID not found in localStorage.");
            return;
          }
    
          try{
            const response = await axiosPrivate.get(`/users/${userId}`);
            console.log("API Response:", response.data);
            setUser(response.data);
          }catch(err){
            console.error("Error fetching user data:", err);
          }
        }
    
        fetchUserData();
    
    }, [userId])

    useEffect(()=>{
      console.log(user);
    }, [])
    
  return (
    <>
        {user ? 
            <>
                <div className='fixed top-0 right-0 left-0 z-40'>
                    <ProfileHeader id={user.idNumber} userImage={`${BASE_URL}${user.image}`} />
                </div>
                <main className='flex flex-col items-center justify-center mt-36 p-4 font-Montserrat'>
                    <button onClick={moveToEditProfile} className='bg-white font-bold py-2 px-3 rounded-lg text-[#3b44e6] border transition-all hover:border hover:border-[#ccc] text-sm'>Edit Profile</button>
                    <div className='bg-white mt-5 px-4 py-5 border border-[#ccc] rounded-xl flex flex-col justify-center gap-3'>
                        <div className="flex items-center">
                          <div className='font-semibold'>First name:</div>
                          <p className='ml-3'>{user.firstname}</p>
                        </div>
                        <div className="flex items-center">
                          <div className='font-semibold'>Last name:</div>
                          <p className='ml-3'>{user.lastname}</p>
                        </div>
                        <div className="flex items-center">
                          <div className='font-semibold'>Email:</div>
                          <p className='ml-3'>{user.email}</p>
                        </div>
                        <div className="flex items-center">
                          <div className='font-semibold'>Department:</div>
                          <p className='ml-3'>{user.department}</p>
                        </div>
                        <div className="flex items-center">
                          <div className='font-semibold'>Level:</div>
                          <p className='ml-3'>{user.level}</p>
                        </div>
                    </div>
                </main>
                <ProfileFotter />
            </>
            : 
            <Loading link='/profile'/>
        }
    </>
  )
}

export default UserProfile;