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
            setUser(response.data);
          }catch(err){
            console.error("Error fetching user data:", err);
          }
        }
    
        fetchUserData();
    
    }, [userId])
    
  return (
    <>
        {user ? 
            <>
                <div className='fixed top-0 right-0 left-0 z-40'>
                    <ProfileHeader id={user.idNumber} userImage={`${BASE_URL}${user.image}`} />
                </div>
                <main className='flex flex-col items-center justify-center font-Montserrat'>
                    <button onClick={moveToEditProfile} className='font-bold py-2 px-3 rounded-lg text-[#070181] border border-[#ccc] transition-all hover:border hover:border-[#ccc] text-sm'>Edit Profile</button>
                    <div className="flex flex-col items-center justify-center mt-2">
                      <div className='rounded-xl flex flex-col gap-2'>
                          <div className="flex items-center justify-center">
                            <p className='font-bold'>{user.firstname} {user.lastname}</p>
                          </div>
                          <div className="flex items-center justify-center">
                            <p className=''>{user.email}</p>
                          </div>
                          <div className="flex items-center justify-center">
                            <p className=''>{user.department}</p>
                          </div>
                          <div className="flex items-center justify-center">
                            <p className=''>{user.level}</p>
                          </div>
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