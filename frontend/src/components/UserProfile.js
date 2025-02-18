import React, { useContext, useState, useEffect } from 'react'
import ProfileHeader from './ProfileHeader'
import ProfileFotter from './ProfileFotter'
import { useNavigate } from 'react-router-dom'
import { DataContext } from './context/DataContext'
import Loading from './utils/Loading'
import axios from 'axios'
const UserProfile = () => {
    const navigate = useNavigate();
    const moveToEditProfile = () => {
        navigate('/profile/edit')
    }
    const [user, setUser] = useState('');
    const [imageUrl, setImageUrl] = useState(null)
    const { loading, userId} = useContext(DataContext);

    useEffect(()=>{
        const fetchUserData = async ()=>{
    
          if (!userId) {
            console.error("User ID not found in localStorage.");
            return;
          }
    
          try{
            const response = await axios.get(`https://unigpacalculator-api.onrender.com/users/${userId}`);
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
          .get(`https://unigpacalculator-api.onrender.com/user-image/${userId}`, {
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
        {user && !loading ? 
            <>
                <div className='fixed top-0 right-0 left-0 z-40'>
                    <ProfileHeader id={user.idNumber} userImage={imageUrl} />
                </div>
                <main className='flex flex-col items-center mt-36 p-4 font-Montserrat'>
                    <button onClick={moveToEditProfile} className='bg-white font-bold py-2 px-3 rounded-lg text-[#3b44e6] border transition-all hover:border hover:border-[#3b44e6] text-sm'>Edit Profile</button>
                    <div className='bg-white mt-5 px-4 py-5 rounded-xl flex flex-col gap-3'>
                        <p>First name: {user.firstname}</p>
                        <p>Last name: {user.lastname}</p>
                        <p>Email: {user.email}</p>
                        <p>Password: {user.password}</p>
                        <p>Department: {user.department}</p>
                        <p>Level: {user.level}</p>
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