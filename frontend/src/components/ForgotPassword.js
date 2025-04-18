import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import emailSchema from '../schemas/forgotPasswordSchema'
import axios from '../api/axios'
import Failure from "./utils/Failure";
import ResetLinkMsg from './utils/ResetLinkMsg'
import { LoaderCircle } from 'lucide-react'
const ForgotPassword = () => {
    const [success, setSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(emailSchema)
    })

    const handleSubmitEmail = async (data)=>{
        setIsLoading(true)
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
                setIsLoading(false)
                setSuccess(true)
                reset()
            }
        }catch(err){
            setIsLoading(false)
            if(!err?.response){
                setErrMsg("Something went wrong.");
            }else if(err.response?.status === 404){
                setErrMsg("Email does not exists");
            }
        }
    }
  return (
        <div className='flex flex-col items-center justify-center h-[100vh] gap-2 drop-shadow-2xl font-Montserrat'>
            <img src='miskul_icon.png' className='w-[50px]'/>
            <h1 className='font-semibold text-2xl'>Forgot Password?</h1>
            {success ? (
                <ResetLinkMsg setSuccess={setSuccess} />
            ): errMsg && <Failure errMsg={errMsg} setErrMsg={setErrMsg}/>}
            <form onSubmit={handleSubmit(handleSubmitEmail)} action="" className='flex flex-col gap-2 px-5'>
                <div className="flex flex-col">
                    {/* <label htmlFor="email">Email address</label> */}
                    <input 
                        id='email'
                        type="text" 
                        autoComplete='off'
                        className='input-field'
                        placeholder='Email'
                        {...register("email")}
                    />
                </div>
                <button type="submit" className='reset-btn flex items-center justify-center'>{isLoading ? <LoaderCircle className='animate-spin' /> : "Reset Password"}</button>
            </form>
            <div className="flex items-center">
                <p className="text-base">Remember your password?</p>
                <Link to={'/'} className='ml-1 text-[#070181] font-medium gap-4'>Sign In</Link>
            </div>
        </div>
  )
}

export default ForgotPassword;