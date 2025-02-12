import React, { useState, useEffect} from 'react';
import ProfileFooter from './ProfileFotter';
import ProfileHeader from './ProfileHeader';
import { useContext } from 'react';
import { DataContext } from './context/DataContext';
import { useNavigate } from 'react-router-dom';
import Loading from './utils/Loading';
import axios from 'axios';
const EditProfilePage = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState()
    const {userId, loading, formData, setFormData} = useContext(DataContext);

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



    const cpyFormData = formData;
    let disable = true


    const handleEditForm = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        disable = cpyFormData !== formData;
    }

    const handleImageChange = (e) => {
        const fileName = document.querySelector('.fileName');
        const imgURL = e.target.files[0];
        fileName.innerHTML = imgURL.name;
        setFormData({
            ...formData,
            image: URL.createObjectURL(imgURL)
        })
    }

    const handleSaveChanges = (e) => {
        e.preventDefault();
        setUser(formData);
        navigate('/profile');
    }

  return (
    <>
        {   
            user && !loading ?
                <>
                    <div className='fixed top-0 right-0 left-0 z-40'>
                        <ProfileHeader pageTitle='Edit Profile' userImage={formData?.image}/>
                    </div>
                    <main className='flex flex-col items-center mt-5 px-4 pb-20 pt-32 font-Montserrat'>
                        <div className='flex flex-col items-center relative '>
                            <label htmlFor="image" className='absolute bg-white font-bold py-2 px-3 rounded-lg text-[#3b44e6] border transition-all hover:border hover:border-[#3b44e6] hover:cursor-pointer text-sm'>Change Profile</label>
                            <input
                                id='image' 
                                type="file" 
                                className='opacity-0 -z-30'
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className='fileName text-[#3b44e6] mt-3 text-center
                        '></div>
                        
                        <form className='bg-white mt-2 px-4 py-5 rounded-xl w-full sm: max-w-md flex flex-col'>
                            <label className='text-[#8b8b8b] mt-2 px-2 text-lg' htmlFor="firstName">Firstname:</label>
                            <input
                                className='bg-[#f9f9f9] p-2 text-lg rounded-lg outline-none'
                                autoFocus
                                name='firstName'
                                type="text"
                                value={formData?.firstname}
                                onChange={handleEditForm}
                            />
            
                            <label className='text-[#8b8b8b] mt-2 px-2 text-lg' htmlFor="lastName">Lastname:</label>
                            <input className='bg-[#f9f9f9] p-2 text-lg rounded-lg outline-none'
                                type="text"
                                name='lastName'
                                value={formData?.lastname}
                                onChange={handleEditForm}
                            />
            
                            <label className='text-[#8b8b8b] mt-2 px-2 text-lg' htmlFor="idNumber">ID Number:</label>
                            <input className='bg-[#f9f9f9] p-2 text-lg rounded-lg outline-none'
                                name='idNumber'
                                type='text' 
                                value={formData?.idNumber}
                                onChange={handleEditForm}
                            />
            
                            <label className='text-[#8b8b8b] mt-2 px-2 text-lg' htmlFor="email">Email:</label>
                            <input className='bg-[#f9f9f9] p-2 text-lg rounded-lg outline-none'
                                name='email'
                                type="email" 
                                value={formData?.email}
                                onChange={handleEditForm}/>
            
                            <label className='text-[#8b8b8b] mt-2 px-2 text-lg' htmlFor="phone">Department:</label>
                            <input className='bg-[#f9f9f9] p-2 text-lg rounded-lg outline-none'
                                name='phone'
                                type='text' 
                                value={formData?.department}
                                onChange={handleEditForm}
                            />
            
                            <label className='text-[#8b8b8b] mt-2 px-2 text-lg' htmlFor="level">Level:</label>  
                            <select className='bg-[#f9f9f9] p-2 text-lg rounded-lg outline-none' 
                                name="level"
                                id="level"
                                value={formData?.level}
                                onChange={handleEditForm}
                            >
                                <option value="1">Year 1</option>
                                <option value="2">Year 2</option>
                                <option value="3">Year 3</option>
                                <option value="4">Year 4</option>
                            </select>
            
                            <button className='bg-white font-bold py-2 px-3 mt-4 rounded-lg text-[#3b44e6] border transition-all hover:border hover:border-[#3b44e6] text-sm self-center disabled:opacity-70 disabled:hover:border-[#f3f3f3]' disabled={cpyFormData !== formData} onClick={handleSaveChanges}>Save Changes</button>
                        </form>
                    </main>
                    <ProfileFooter /></>
            : <Loading link='/profile/edit'/>
        }
    </>
  )
}

export default EditProfilePage;