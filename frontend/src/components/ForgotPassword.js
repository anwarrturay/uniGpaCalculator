import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import emailSchema from '../schemas/forgotPasswordSchema'
const ForgotPassword = () => {

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(emailSchema)
    })

    const handleSubmitEmail = async (data)=>{
        console.log("form Submitted: ", data)
        reset()
    }
  return (
    <div className='flex flex-col relative top-40 xs:top-48 xl:top-32 items-center justify-start bg-white drop-shadow-2xl shadow shadow-blue-300 w-[370px] h-[350px] xs:w-[400px] sm:w-[430px] md:w-[440px] rounded-md font-Montserrat'>
        <h1 className='font-semibold text-2xl mt-8'>Forgot Password?</h1>
        <form onSubmit={handleSubmit(handleSubmitEmail)} action="" className='flex flex-col p-5 mt-3'>
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
            <Link to={'/'} className='ml-1 text-[#070181] font-medium gap-4'> Login here</Link>
        </div>
    </div>
  )
}

export default ForgotPassword;