import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import passwordSchema from "../schemas/ResetPasswordSchema"
import { useParams } from "react-router-dom"
import PasswordVisibility from './utils/PasswordVisibility';
import axios from "../api/axios";
import Failure from "./utils/Failure"
import PasswordResetMsg from './utils/PasswordResetMsg';
const ResetPassword = () => {
    const [success, setSuccess] = useState(false);
    const { token } = useParams()
    const [errMsg, setErrMsg] = useState("");
    const { register, handleSubmit, formState: {errors}, reset, watch} = useForm({
        resolver: yupResolver(passwordSchema)
    })

    const { passwordToggleButton, showPassword } = PasswordVisibility();

    const handlePasswordReset = async (data)=>{
        console.log("form submitted: ", data);
        const formData = new FormData();
        formData.append("password", data.password);
        console.log(formData)
        try{
            const response = await axios.post(
                `/auth/reset-password/${token}`,
                formData,
                {headers: {"Content-Type": "application/json"}}
            )
            console.log("Server Response for Password Reset: ", response.data);
            if(response.status === 200){
                setSuccess(true);
                reset();
            }
        }catch(err){
            if(!err?.response){
                setErrMsg("No server response")
            }else if(err.response?.status === 404){
                setErrMsg("Password or token is required")
            }else if(err.response?.status === 400){
                setErrMsg("Token is invalid or expired")
            }else{
                setErrMsg("Unable to reset password");
            }
        }
    }

  return (

    <div className={`flex flex-col items-center justify-center h-[100vh] drop-shadow-2xl font-Montserrat`}>
        <img src='/miskul_icon.png' className='w-[50px]'/>
        <h1 className='font-semibold text-2xl'>Reset account password</h1>
        <p className="text-center text-[#8b8b8b] font-medium text-sm mb-2">Enter a new password below</p>
        {success ? (
            <PasswordResetMsg />
        ) : errMsg && <Failure errMsg={errMsg}/>}
        <form onSubmit={handleSubmit(handlePasswordReset)} action="" className='flex flex-col gap-2 px-5'>
            <div className="flex flex-col relative">
                <label htmlFor="password" className='absolute -left-[100000000px]'>New Password</label>
                <input 
                    id='password'
                    type={showPassword ? "text" : "password"} 
                    autoComplete='off'
                    placeholder='New Password'
                    className={`input-field ${errors?.password && "border-red-600" }`}
                    {...register("password")}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="confirm-password" className='absolute -left-[100000000px]'>Confirm Password</label>
                <div className="relative">
                    <input 
                        id='confirm-password'
                        type={showPassword ? "text" : "password"} 
                        autoComplete='off'
                        placeholder='Confirm Password'
                        className={`input-field ${errors.confirmPassword && "border-red-600"}`}
                        {...register("confirmPassword", {
                            validate: (value) => value === watch("password") || "Passwords do not match"
                        })}
                    />
                    {passwordToggleButton}
                </div>
            </div>
            <button type="submit" className='reset-btn'>Reset Password</button>
        </form>
    </div>

  )
}

export default ResetPassword;