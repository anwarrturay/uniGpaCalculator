import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import { Eye, EyeOff } from 'lucide-react';
import Success from './utils/Success';
import Failure from './utils/Failure';
import { jwtDecode } from 'jwt-decode'
import useAuth from '../hooks/useAuth.js';
import {useForm} from "react-hook-form"
import loginSchema from '../schemas/loginSchema.js';
import { yupResolver } from '@hookform/resolvers/yup';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  const { setAuth, persist, setPersist } = useAuth();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/studentdashboard";

  const { register, handleSubmit, formState: {errors}, watch, reset} = useForm({
    resolver: yupResolver(loginSchema)
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmitForm = async (data) => {
    console.log("form submitted: ", data)
    const formData = new FormData();
    formData.append("idNumber", data.idNumber)
    formData.append("password", data.password)
    setIsLoading(true);

    try {
      const response = await axios.post(
        '/auth',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      );
      if(response) console.log(response.data);
      const { accessToken } = response.data;
      const decodedToken = jwtDecode(accessToken);

      const userId = decodedToken?.userId;
      const roles = decodedToken?.roles
      
      setAuth({ accessToken, userId, roles})

      if(response.status === 200){
        setSuccess(true);
        setIsLoading(false);
        navigate(from, { replace: true });
        reset();
      }
    } catch (err) {
      setSuccess(false);
      setIsLoading(false);
      if (!err?.response) {
          setErrMsg("No Server Response");
      } else if (err.response?.status === 401) {
          setErrMsg("Incorrect email or password");
      } else {
          setErrMsg("Login failed, Please try again");
      }
    }
  };

  const togglePersist = ()=>{
    setPersist(prev=> !prev)
  }


  return (
    <>
 
        <div className="flex flex-col relative top-40 xs:top-48 xl:top-32 items-center justify-center bg-white drop-shadow-2xl shadow shadow-blue-300 w-[370px] h-[350px] xs:w-[400px] sm:w-[430px] md:w-[440px] rounded-md">
          <h2 className="font-bold font-Montserrat mt-3 text-xl">WELCOME BACK</h2>
          <div className="flex items-center relative top-3 justify-center">
              {success ? <Success /> : (errMsg && <Failure errMsg={errMsg} />)}
          </div>
          <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col p-5 mt-3 font-Montserrat">
            <input
              type="number"
              {...register("idNumber")}
              placeholder="ID Number"
              className="input-field"
              autoComplete="off"
            />
            <input
              type={showPassword ? 'text' : 'password'}
              {...register("password")}
              placeholder="Password"
              className="input-field"
              autoComplete="off"
            />
            <div className="relative top-[-48px] w-[300px]">
              {watch("password") && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 sm:right-[-14px] top-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              )}
            </div>

            <button type="submit" className="bg[#070181] py-2 px-5 font-Montserrat mt-3 rounded-md text-white font-medium text-center">
              LOGIN
            </button>
            <div className="flex items-center justify-between">
              <div className="flex items-center mt-2">
                  <input 
                      type="checkbox" 
                      id='persist'
                      onChange={togglePersist}
                      checked={persist}
                      className='mr-2'
                  />
                  <label htmlFor="persist" className='text-sm'>Keep me signed in</label>
              </div>
              <div className="flex justify-end items-end mt-3 text-sm font-medium text-[#070181] cursor-pointer gap-4">
                Forgot Password ?
              </div>
            </div>
          </form>
          <p className="font-Montserrat mb-3 text-lg">
            Do not have an account?{' '}
            <span className="text-[#070181] cursor-pointer font-medium" onClick={()=> navigate('/signup')}>
              sign up
            </span>
          </p>
        </div>
    </>
  );
}

export default Login;