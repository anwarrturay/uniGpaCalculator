import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from '../api/axios';
import Success from './utils/Success';
import Failure from './utils/Failure';
import { jwtDecode } from 'jwt-decode'
import useAuth from '../hooks/useAuth.js';
import {useForm} from "react-hook-form"
import loginSchema from '../schemas/loginSchema.js';
import { yupResolver } from '@hookform/resolvers/yup';
import PasswordVisibility from './utils/PasswordVisibility.js';
import miskul_icon from '../assets/miskul_icon.png'
import { ArrowUpRight } from 'lucide-react';
function Login() {
  const {token} = useParams()
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  const { setAuth, persist, setPersist } = useAuth();
  const location = useLocation();
  const { passwordToggleButton, showPassword} = PasswordVisibility();

  const { register, handleSubmit, formState: {errors}, watch, reset} = useForm({
    resolver: yupResolver(loginSchema)
  })

  const url = token ? `/auth/${token}` : '/auth';
  const handleSubmitForm = async (data) => {
    console.log("form submitted: ", data)
    const formData = new FormData();
    formData.append("email", data.email)
    formData.append("password", data.password)
    setIsLoading(true);

    try {
      const response = await axios.post(
        url,
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
      const roles = decodedToken?.roles;
      const isNewUser = decodedToken?.isNewUser;

      // If is New User then navigate to the tips component else maintain to the studentdashboard.
      const from = isNewUser ? location.state?.from?.pathname || "/studentdashboard" : "/tips";
      
      setAuth({ accessToken, userId, roles})

      if(response.status === 200){
        setSuccess(false);
        setIsLoading(true);
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
 
        <div className="flex flex-col h-[100vh] items-center justify-center drop-shadow-2xl gap-2">
          <div className="flex flex-col gap-1 items-center justify-center">
            <div>
              <img src={miskul_icon} alt="" className='w-[50px]'/>
            </div>
            <h2 className="font-bold font-Montserrat text-xl">Sign In with MiSkul Account</h2>
          </div>
          <div className="flex items-center justify-center">
              {success ? <Success /> : (errMsg && <Failure errMsg={errMsg} />)}
          </div>
          <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col px-5 -mt-2 font-Montserrat">
              <input
                type="email"
                {...register("email")}
                placeholder="Email"
                className="input-field"
                autoComplete="off"
              />
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register("password")}
                  placeholder="Password"
                  className="input-field focus:outline-none"
                  autoComplete="off"
                />
                {passwordToggleButton}
              </div>

            <button type="submit" className="bg-[#070181] py-2 px-5 font-Montserrat rounded-md text-white font-medium text-center">
              Login
            </button>
            <div className="flex items-center justify-center">
              <div className="flex items-center mt-2">
                  <input 
                      type="checkbox" 
                      id='persist'
                      onChange={togglePersist}
                      checked={persist}
                      className='mr-2'
                  />
                  <label htmlFor="persist" className='text-base'>Keep me signed in</label>
              </div>
            </div>
          </form>
          <div onClick={()=> navigate("/forgot-password")} className="flex justify-center text-base font-medium text-[#070181] cursor-pointer">
              Forgot Password?
              <ArrowUpRight size={24} className='text-[#070181]'/>
            </div>
          <p className="font-Montserrat text-base">
            <span className="text-[#070181] cursor-pointer font-semibold" onClick={()=> navigate('/signup')}>
              Create MiSkul Account
            </span>
          </p>
        </div>
    </>
  );
}

export default Login;