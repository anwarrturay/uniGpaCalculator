import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import emailSchema from '../schemas/forgotPasswordSchema'
import axios from '../api/axios'
import Failure from "./utils/Failure";
import ResetLinkMsg from './utils/ResetLinkMsg'
const ForgotPassword = () => {
    const [success, setSuccess] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(emailSchema)
    })

    const handleSubmitEmail = async (data)=>{
        console.log("form Submitted: ", data)
        const formData = new FormData();
        formData.append("email", data.email)
        try{
            const response = await axios.post(
                '/forgot-password',
                formData,
                {
                    headers: {"Content-Type": "application/json"},
                }
            )
            console.log("Server forgot Password Response: ", response.data)
            if(response.status === 200){
                setSuccess(true)
                reset()
            }
        }catch(err){
            setErrMsg("");
            setTimeout(()=>{
                if(!err?.response){
                    setErrMsg("Something went wrong.");
                }else if(err.response?.status === 404){
                    setErrMsg("Email doesnot exists");
                }
            }, 50)
        }
    }
  return (
        <div className='flex flex-col relative top-40 xs:top-48 xl:top-32 items-center justify-start drop-shadow-2xl font-Montserrat'>

            <h1 className='font-semibold text-2xl mt-8 mb-2'>Forgot Password?</h1>
            {success ? (
                <ResetLinkMsg />
            ): errMsg && <Failure errMsg={errMsg}/>}
            <form onSubmit={handleSubmit(handleSubmitEmail)} action="" className='flex flex-col p-5'>
                <div className="flex flex-col">
                    <label htmlFor="email">Email address</label>
                    <input 
                        id='email'
                        type="text" 
                        autoComplete='off'
                        className='input-field'
                        {...register("email")}
                    />
                </div>
                <button type="submit" className='reset-btn'>Reset Password</button>
            </form>
            <div className="flex items-center">
                <p className="text-base">Remember your password?</p>
                <Link to={'/'} className='ml-1 text-[#070181] font-medium gap-4'>Sign In</Link>
            </div>
        </div>
  )
}

export default ForgotPassword;