import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
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
  // getting the password value from the formData obj.
  const { password } = formData;

  const [showPassword, setShowPassword] = useState(false);
  // Password visibility function
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to register the user
    // On success:
    navigate('/home');
  };

  return (
    <div className="flex flex-col relative top-24 xs:top-20 xl:top-10 items-center justify-center bg-white drop-shadow-2xl shadow shadow-blue-300 w-[370px] xs:w-[400px] sm:w-[450px] rounded-md">
      <h2 className='font-bold font-Montserrat text-xl mt-4 mb-3'>Student Registration</h2>
      <form onSubmit={handleSubmit} className='flex flex-col p-5 mt-3 font-Montserrat'>
        <input
          type="text"
          placeholder="Firstname"
          value={formData.firstname}
          onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
          required
          className='mb-2 w-[300px] xs:w-[330px] sm:w-[360px] border border-[#ccc] rounded-md focus:ring-2 focus:ring-blue-500'
        />
        <input
          type="text"
          placeholder="Lastname"
          value={formData.lastname}
          onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
          required
          className='mb-2 w-[300px] xs:w-[330px] sm:w-[360px] border border-[#ccc] rounded-md focus:ring-2 focus:ring-blue-500'
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className='mb-2 w-[300px] xs:w-[330px] sm:w-[360px] border border-[#ccc] rounded-md focus:ring-2 focus:ring-blue-500'
        />
        <input
          type="text"
          placeholder="ID Number"
          value={formData.idNumber}
          onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
          required
          className='mb-2 w-[300px] xs:w-[330px] sm:w-[360px] border border-[#ccc] rounded-md focus:ring-2 focus:ring-blue-500'
        />
        <input
          type={showPassword ? "text" :"password"}
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          className='mb-2 w-[300px] xs:w-[330px] border border-[#ccc] sm:w-[360px] rounded-md focus:ring-2 focus:ring-blue-500'
        />
        <div className="relative top-[-48px] w-[300px]">
          {password &&
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 sm:right-[-14px] xl:right-[-52px] top-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
            {showPassword ? <EyeOff /> : <Eye /> }
            </button>
          }
        </div>
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
          className='mb-2 w-[300px] xs:w-[330px] border border-[#ccc] sm:w-[360px] rounded-md focus:ring-2 focus:ring-blue-500'
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
          className='mb-2 w-[300px] xs:w-[330px] border border-[#ccc] sm:w-[360px] rounded-md focus:ring-2 focus:ring-blue-500'
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
      <p className='font-Montserrat mb-3 text-lg'>
        Already have an account?{' '}
        <Link to={'/'} className="text-blue-500 cursor-pointer font-medium">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Signup;