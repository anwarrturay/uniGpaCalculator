import React, { useContext } from 'react'
import ProfileHeader from './ProfileHeader'
import ProfileFotter from './ProfileFotter'
import { useNavigate } from 'react-router-dom'
import { DataContext } from './context/DataContext'
import Loading from './utils/Loading'

const UserProfile = () => {
    const navigate = useNavigate();
    const moveToEditProfile = () => {
        navigate('/profile/edit')
    }
    const {user, loading} = useContext(DataContext);
    
  return (
    <>
        {user && !loading ? 
            <>
                <div className='fixed top-0 right-0 left-0 z-40'>
                    <ProfileHeader id={user.idNumber} userImage={user.image} />
                </div>
                <main className='flex flex-col items-center mt-36 p-4 font-Montserrat'>
                    <button onClick={moveToEditProfile} className='bg-white font-bold py-2 px-3 rounded-lg text-[#3b44e6] border transition-all hover:border hover:border-[#3b44e6] text-sm'>Edit Profile</button>
                    <div className='bg-white mt-5 px-4 py-5 rounded-xl flex flex-col gap-3'>
                        <p>First name: {user.firstName}</p>
                        <p>Last name: {user.lastName}</p>
                        <p>Level: {user.level}</p>
                        <p>Mobile: {user.phone}</p>
                        <p>Email: {user.email}</p>
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