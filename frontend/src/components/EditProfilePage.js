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
    const [previewImage, setPreviewImage] = useState(null);


    const {register, handleSubmit, formState: {errors}, watch, reset, setValue} = useForm({
        resolver: yupResolver(updateInfoSchema),
        defaultValues: {
            firstname: '',
            lastname: '',
            idNumber: '',
            department: '',
            level: '',
            image: '',
        },
    })


    //  Fetching User personal details here.
    useEffect(() => {
        const fetchUserData = async () => {
          if (!userId) return;
    
          try {
            const res = await axiosPrivate.get(`/users/${userId}`);
            if (res.data) {
              const data = res.data;
              setValue('firstname', data.firstname || '');
              setValue('lastname', data.lastname || '');
              setValue('idNumber', data.idNumber || '');
              setValue('department', data.department || '');
              setValue('level', data.level || '');
    
              const imageUrl = data.image?.startsWith('/uploads')
                ? `${BASE_URL}${data.image}`
                : data.image;
    
              setValue('image', imageUrl || '');
              setPreviewImage(imageUrl);
              setUser(data);
            }
          } catch (err) {
            console.error('Error fetching user data:', err);
          }
        };
    
        fetchUserData();
    }, [userId, axiosPrivate, setUser, setValue]);


    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        console.log("File Selected: ", file);
        console.log("File Size: ", file.size);
    
        const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl);
        
        setValue("image", file, { shouldValidate: true });
    
        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await axiosPrivate.patch(`/users/${userId}`, formData);
            console.log(response.data);
        
            if (response.status === 200) {  
              const updatedImageUrl = response.data.image?.startsWith("/uploads")
                ? `${BASE_URL}${response.data.image}`
                : response.data.image;
        
              setValue("image", updatedImageUrl);
              setPreviewImage(updatedImageUrl);
        
              setUser(prevUser => ({
                ...prevUser,
                image: updatedImageUrl
              }));
              navigate("/profile")
            }
        } catch (err) {
            console.error("Error updating image:", err);
        } 
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
                setErrMsg("Unable to update user");
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
                        {/* Success / Error Message */}
                        {success ? (
                            <div className='bg-[#00FF94] text-green-800 rounded-md px-4 py-2 font-bold'>
                            Changes saved!
                            </div>
                        ) : (
                            errMsg && <Failure errMsg={errMsg} />
                        )}
                        {/* Change profile section */}
                        <div className='flex flex-col items-center justify-center relative left-4 xxs:left-2'>
                            <label htmlFor="image" className='absolute font-bold py-2 px-3 rounded-lg text-[#070181] border border-[#ccc] transition-all hover:border hover:border-[#070181] hover:cursor-pointer text-sm'>Change Profile</label>
                            <input
                                id='image' 
                                type="file" 
                                className='opacity-0 -z-30'
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center relative left-4 xxs:left-2">
                            <form onSubmit={handleSubmit(handleSaveChanges, (errors)=> console.log("Validation error: ", errors))} className='mt-2 px-4 py-5 rounded-xl sm:max-w-md flex flex-col'>
                                <div className="flex flex-col justify-center">
                                    <label className='text-[#8b8b8b] mt-2 px-2 text-lg' htmlFor="firstName">Firstname:</label>
                                    <input
                                        className='input-field'
                                        type="text"
                                        {...register("firstname")}
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <label className='text-[#8b8b8b] mt-2 px-2 text-lg' htmlFor="lastName">Lastname:</label>
                                    <input className='input-field'
                                        type="text"
                                        {...register("lastname")}
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <label className='text-[#8b8b8b] mt-2 px-2 text-lg' htmlFor="idNumber">ID Number:</label>
                                    <input className='input-field'
                                        type='number' 
                                        {...register("idNumber")}
                                    />
                                </div>

                                <div className="flex flex-col justify-center">
                                    <label className='text-[#8b8b8b] mt-2 px-2 text-lg' htmlFor="department">Department:</label>
                                    <input className='input-field'
                                        type='text' 
                                    {...register("department")}
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <label className='text-[#8b8b8b] mt-2 px-2 text-lg' htmlFor="level">Level:</label>  
                                    <select className='input-field' 
                                        id="level"
                                        {...register("level")}
                                    >
                                        <option value="Year 1">Year 1</option>
                                        <option value="Year 2">Year 2</option>
                                        <option value="Year 3">Year 3</option>
                                        <option value="Year 4">Year 4</option>
                                    </select>
                                </div>
                
                                <button type='submit' className='bg-white font-bold py-2 px-3 mt-4 rounded-lg text-[#070181] border border-[#ccc] transition-all hover:border hover:border-[#3b44e6] text-sm self-center disabled:opacity-70 disabled:hover:border-[#f3f3f3]'>Save Changes</button>
                            </form>
                        </div>
                    </main>
                    <ProfileFooter /></>
            : <Loading link='/profile/edit'/>
        }
    </>
  )
}

export default EditProfilePage;