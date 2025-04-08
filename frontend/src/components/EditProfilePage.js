import React, { useState, useEffect} from 'react';
import ProfileFooter from './ProfileFotter';
import ProfileHeader from './ProfileHeader';
import { useNavigate } from 'react-router-dom';
import Loading from './utils/Loading';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import { BASE_URL } from '../api/axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import updateInfoSchema from '../schemas/updateInfoSchema'
import Success from './utils/Success';
import Failure from './utils/Failure';

const EditProfilePage = () => {
    const navigate = useNavigate()
    const {user, setUser, auth, loading} = useAuth()
    const userId = auth?.userId;
    const axiosPrivate = useAxiosPrivate();
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const {register, handleSubmit, formState: {errors}, watch, reset, setValue} = useForm({
        resolver: yupResolver(updateInfoSchema)
    })

    useEffect(()=>{
        const fetchUserData = async ()=>{
    
          if (!userId) {
            console.error("User ID not found in localStorage.");
            return;
          }

          try{
            const res = await axiosPrivate.get(`/users/${userId}`);
            console.log("API Response:", res.data);
            if (res.data) {
                if (res.data.firstname !== watch("firstname")) {
                    setValue("firstname", res.data.firstname || "");
                }
                if (res.data.lastname !== watch("lastname")) {
                    setValue("lastname", res.data.lastname || "");
                }
                if (res.data.idNumber !== watch("idNumber")) {
                    setValue("idNumber", res.data.idNumber || "");
                }    
                if (res.data.department !== watch("department")) {
                    setValue("department", res.data.department || "");
                }
                if (res.data.level !== watch("level")) {
                    setValue("level", res.data.level || "");
                }
            }
            setUser(res.data);
          }catch(err){
            console.error("Error fetching user data:", err);
          }
        }
    
        fetchUserData();
    
    }, [userId])

    console.log("fetched values: ",watch("firstname"))


    const handleImageChange = (e) => {
        // const fileName = document.querySelector('.fileName');
        // const imgURL = e.target.files[0];
        // fileName.innerHTML = imgURL.name;
        // setFormData({
        //     ...formData,
        //     image: URL.createObjectURL(imgURL)
        // })
        console.log("image uploaded");
        
    }

    const handleSaveChanges = async (data) => {
        console.log("form submitted: ", data);
        const formData = new FormData();
        formData.append("firstname", data.firstname)
        formData.append("lastname", data.lastname)
        formData.append("idNumber", data.idNumber)
        formData.append("department", data.department)
        formData.append("level", data.level)

        try{
            const response = await axiosPrivate.patch(
                `/users/${userId}`,
                formData,
            )
            console.log("Response Data: ", response.data);
            setUser(response.data);
            if(response.status === 200){
                setSuccess(true);
                navigate("/profile");
                reset()
            }
        }catch(err){
            console.error(err);
            if(!err?.response){
                setErrMsg("No Server Response");
            }else if(err.response === 400){
                setErrMsg("Unable to update user")
            }
        }
    }

  return (
    <>
        {   
            user ?
                <>
                    <div className='fixed top-0 right-0 left-0 z-40'>
                        <ProfileHeader pageTitle='Edit Profile' userImage={`${BASE_URL}${user.image}`}/>
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
                        <div className={`flex items-center relative top-3 justify-center ${success ? "flex" : "hidden"}`}>
                            {success ? <div className='bg-[#00FF94] flex flex-col items-center justify-center rounded-md font-Montserrat'>
                                <p className='text-green-800'>Changes saved</p>
                            </div> : <Failure errMsg={errMsg} />}
                        </div>
                        <form onSubmit={handleSubmit(handleSaveChanges, (errors)=> console.log("Validation error: ", errors))} className='bg-white mt-2 px-4 py-5 rounded-xl w-full sm:max-w-md flex flex-col'>
                            <label className='text-[#8b8b8b] mt-2 px-2 text-lg' htmlFor="firstName">Firstname:</label>
                            <input
                                className='bg-[#f9f9f9] p-2 text-lg rounded-lg outline-none'
                                autoFocus
                                name='firstname'
                                value={watch("firstname")}
                                type="text"
                                {...register("firstname")}
                            />
            
                            <label className='text-[#8b8b8b] mt-2 px-2 text-lg' htmlFor="lastName">Lastname:</label>
                            <input className='bg-[#f9f9f9] p-2 text-lg rounded-lg outline-none'
                                type="text"
                                name='lastName'
                                {...register("lastname")}
                                value={watch("lastname")}
                            />
            
                            <label className='text-[#8b8b8b] mt-2 px-2 text-lg' htmlFor="idNumber">ID Number:</label>
                            <input className='bg-[#f9f9f9] p-2 text-lg rounded-lg outline-none'
                                name='idNumber'
                                type='number' 
                                {...register("idNumber")}
                                value={watch("idNumber")}
                            />

                            <label className='text-[#8b8b8b] mt-2 px-2 text-lg' htmlFor="department">Department:</label>
                            <input className='bg-[#f9f9f9] p-2 text-lg rounded-lg outline-none'
                                name='department'
                                type='text' 
                               {...register("department")}
                               value={watch("department")}
                            />
            
                            <label className='text-[#8b8b8b] mt-2 px-2 text-lg' htmlFor="level">Level:</label>  
                            <select className='bg-[#f9f9f9] p-2 text-lg rounded-lg outline-none' 
                                name="level"
                                id="level"
                                {...register("level")}
                                value={watch("level")}
                                defaultValue={user?.level}
                            >
                                <option value="Year 1">Year 1</option>
                                <option value="Year 2">Year 2</option>
                                <option value="Year 3">Year 3</option>
                                <option value="Year 4">Year 4</option>
                            </select>
            
                            <button type='submit' className='bg-white font-bold py-2 px-3 mt-4 rounded-lg text-[#3b44e6] border transition-all hover:border hover:border-[#3b44e6] text-sm self-center disabled:opacity-70 disabled:hover:border-[#f3f3f3]'>Save Changes</button>
                        </form>
                    </main>
                    <ProfileFooter /></>
            : <Loading link='/profile/edit'/>
        }
    </>
  )
}

export default EditProfilePage;