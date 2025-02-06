import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import Success from './utils/Success';
import Failure from './utils/Failure';

function Login() {
  const [id_number, setIdNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false)
  const [status, setStatus] = useState(false)
  let display = status === true ? "flex" : "hidden";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://unigpacalculator-api.onrender.com/', { id_number, password }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.data;
      console.log(data)
      navigate('/studentdashboard');
      setIdNumber("");
      setPassword("")

    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred. Please try again later.');
      setStatus(false);
      setSuccess(false)
    }
  };

  return (
    <div className="flex flex-col relative top-40 xs:top-48 xl:top-32 items-center justify-center bg-white drop-shadow-2xl shadow shadow-blue-300 w-[370px] h-[350px] xs:w-[400px] sm:w-[430px] md:w-[440px] rounded-md">
      <h2 className='font-bold font-Montserrat mt-3 text-xl'>WELCOME BACK</h2>
      <div className={`${display}`}>{success ? <Success /> : <Failure />}</div>
      <form onSubmit={handleSubmit} className='flex flex-col p-5 mt-3 font-Montserrat'>
        <input
          type="number"
          value={id_number}
          onChange={(e) => setIdNumber(e.target.value)}
          placeholder="ID Number"
          required
          className='mb-2 w-[300px] sm:w-[330px] border border-[#ccc] rounded-md focus:ring-2 focus:ring-blue-500'
          autoComplete='off'
        />
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className='mb-2 w-[300px] sm:w-[330px] border border-[#ccc] rounded-md focus:ring-2 focus:ring-blue-500'
          autoComplete='off'
        />
        <div className="relative top-[-48px] w-[300px]">
          {password &&
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 sm:right-[-14px] top-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
            {showPassword ? <EyeOff /> : <Eye /> }
            </button>
          }
        </div>

        <button type='submit' className='bg-blue-500 py-2 px-5 font-Montserrat mt-3 rounded-md text-white font-medium text-center'>LOGIN</button> 
        {error && <p className="error-message">{error}</p>}
      </form>
      <p className='font-Montserrat mb-3 text-lg'>
        Do not have an account?{' '}
        <span
          className="text-blue-500 cursor-pointer font-medium"
          onClick={() => navigate('/signup')}
        >
          sign up
        </span>
      </p>
    </div>
  );
}

export default Login;
