import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    idNumber: '',
    year: '',
    password: '',
    department: '',
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to register the user
    // On success:
    navigate('/home');
  };

  return (
    <div className="flex flex-col relative top-5 xs:top-20 items-center justify-center bg-white drop-shadow-2xl shadow shadow-blue-300 w-[500px] xs:w-[350px] rounded-xl">
      <h2 className='font-bold font-Montserrat mt-2 mb-3'>Student Registration</h2>
      <form onSubmit={handleSubmit} className='flex flex-col p-5 mt-3 font-Montserrat'>
        <input
          type="text"
          placeholder="Firstname"
          value={formData.firstname}
          onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
          required
          className='mb-2 w-[300px] border border-[#ccc] rounded-md focus:ring-2 focus:ring-blue-500'
        />
        <input
          type="text"
          placeholder="Lastname"
          value={formData.lastname}
          onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
          required
          className='mb-2 w-[300px] border border-[#ccc] rounded-md focus:ring-2 focus:ring-blue-500'
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className='mb-2 w-[300px] border border-[#ccc] rounded-md focus:ring-2 focus:ring-blue-500'
        />
        <input
          type="text"
          placeholder="ID Number"
          value={formData.idNumber}
          onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
          required
          className='mb-2 w-[300px] border border-[#ccc] rounded-md focus:ring-2 focus:ring-blue-500'
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          className='mb-2 w-[300px] border border-[#ccc] rounded-md focus:ring-2 focus:ring-blue-500'
        />
        {/* <input
          type="text"
          placeholder="Department"
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          required
          className='mb-2 w-[300px] border border-[#ccc] rounded-md focus:ring-2 focus:ring-blue-500'
        /> */}
        <select
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          required
          className='mb-2 w-[300px] border border-[#ccc] rounded-md focus:ring-2 focus:ring-blue-500'
        >
          <option value="" disabled>
           Select Department
          </option>
          <option value="Computer Science">Computer Science</option>
          <option value="Agriculture">Agriculture</option>
          <option value="Law">Law</option>
          <option value="Public Health">Public Health</option>
          <option value="Political Science">Political Science</option>
          <option value="Acccounting && Finance">Acccounting && Finance</option>
          <option value="Business Administration && Mgt">Business Administration && Mgt</option>
          <option value="Public Administration && Mgt">Public Administration && Mgt</option>
          <option value="Development studies">Development studies</option>
          <option value="Human Resource Mgt.">Human Resource Mgt.</option>
          <option value="Procurement Logistics && supply chain Mgt.">Procurement Logistics && supply chain Mgt.</option>
          <option value="Education">Education</option>
          <option value="Philosophy">Philosophy</option>
          <option value="Religious Studies">Religious Studies</option>
          <option value="Nursing">Nursing</option>
          <option value="Economics">Economics</option>
          <option value="Social Work">Social Work</option>
          <option value="Clinical Psychology">Clinical Psychology</option>
          <option value="Special Needs Education">Special Needs Education</option>
        </select>

        <select
          value={formData.year}
          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          required
          className='mb-2 w-[300px] border border-[#ccc] rounded-md focus:ring-2 focus:ring-blue-500'
        >
          <option value="" disabled>
            Level
          </option>
          <option value="Year 1">Year 1</option>
          <option value="Year 2">Year 2</option>
          <option value="Year 3">Year 3</option>
          <option value="Year 4">Year 4</option>
        </select>

        <Link to={'/studentdashboard'} type="submit" className='bg-blue-500 py-2 px-5 font-Montserrat mt-3 rounded-md text-white font-medium text-center'>SIGN UP</Link>
      </form>
      <p className='font-Montserrat mb-3'>
        Already have an account?{' '}
        <Link to={'/'} className="text-blue-500 cursor-pointer font-medium">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Signup;