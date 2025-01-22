import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Login() {
  const [IdNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/login', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ IdNumber, password }),
      });

      const data = await response.data;

      if (response.ok) {
        // On successful login, navigate to the Home page
        navigate('/studentdashboard');
      } else {
        // Show error message from backend
        setError(data.message || 'Invalid login credentials');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col relative top-32 xs:top-48 items-center justify-center bg-white drop-shadow-2xl shadow shadow-blue-300 w-[500px] xs:w-[350px] rounded-xl">
      <h2 className='font-bold font-Montserrat mt-3'>WELCOME BACK</h2>
      <form onSubmit={handleSubmit} className='flex flex-col p-5 mt-3 font-Montserrat'>
        <input
          type="number"
          value={IdNumber}
          onChange={(e) => setIdNumber(e.target.value)}
          placeholder="ID Number"
          required
          className='mb-2 w-[300px] border border-[#ccc] rounded-md focus:ring-2 focus:ring-blue-500'
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className='mb-2 w-[300px] border border-[#ccc] rounded-md focus:ring-2 focus:ring-blue-500'
        />
        <button type="submit" className='bg-blue-500 py-2 px-5 font-Montserrat mt-3 rounded-md text-white font-medium'>LOGIN</button> 
        {error && <p className="error-message">{error}</p>}
      </form>
      <p className='font-Montserrat mb-3'>
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