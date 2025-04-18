import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import axios from '../api/axios';
import Failure from './utils/Failure';
import Loading from './utils/Loading';
import miskul_icon from '../assets/miskul_icon.png'
import VerificationLinkMsg from './utils/VerificationLinkMsg';
function Signup() {
	const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    idNumber: '',
    password: '',
    department: '',
    level: '',
    image: null
  });
  // State for tracking registration feedback.
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  let display = status === true ? "flex" : "hidden";
  const { password } = formData;

  const [showPassword, setShowPassword] = useState(false);
  // Password visibility function
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFileChange = (e) => {
	const file = e.target.files[0];
	console.log("Selected file:", file);
    setFormData({ ...formData, image: file });
  };


  const handleSubmit = async (e) => {
    console.log("form submitted");
    e.preventDefault();
	setIsLoading(true)

	const data = new FormData();
    data.append("firstname", formData.firstname);
    data.append("lastname", formData.lastname);
    data.append("email", formData.email);
    data.append("idNumber", formData.idNumber);
    data.append("password", formData.password);
    data.append("department", formData.department);
    data.append("level", formData.level);
    data.append("image", formData.image);


    try {
      const response = await axios.post("/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const responseData = await response.data;
      if(responseData) setIsLoading(false);
      setStatus(true);
      setSuccess(true);
      // Reset the form
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        idNumber: '',
        level: '',
        password: '',
        department: '',
        image: null,
      });
    } catch (err) {
		setIsLoading(false)
		setSuccess(false)
		setErrMsg('');

		setTimeout(()=>{
			if(!err?.response){
				setErrMsg("No server Response");
			}else if(err.response.status === 409){
				setErrMsg("A User with account already Exists")
			}else{
				setErrMsg("Unable to Create an account")
			}
		}, 50)
    }
  };

  return (
    <>
		<div className="flex flex-col h-[100vh] items-center justify-center drop-shadow-2xl mb-5">
			<div className='font-Montserrat mt-4 flex flex-col items-center justify-center'>
				<img src={miskul_icon} alt="" className='w-[50px] my-2'/>
				<h1 className='text-xl font-semibold'>Create Your MiSkul Account</h1>
				<div className="text-[12px] font-medium text-[#8b8b8b] w-[300px] text-center">
					One MiSkul Account is all you need to access all MiSkul services.
				</div>
				<p className='font-Montserrat text-sm font-semibold mb-2'>
					Already have a an account?{' '}
					<span onClick={()=> navigate(-1)} className="text-[#070181] cursor-pointer font-medium hover:underline">
						Sign In
					</span>
				</p>
			</div>
			<div>
				{success ? 
					(<VerificationLinkMsg />) : 
					(errMsg && <Failure errMsg={errMsg} setErrMsg={setErrMsg} />)
				}
			</div>
			<form onSubmit={handleSubmit} className='flex flex-col gap-[0.35rem] px-5 font-Montserrat'>
				<input
					type="text"
					placeholder="Firstname"
					value={formData.firstname}
					onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
					required
					className='input-field'
				/>
				<input
					type="text"
					placeholder="Lastname"
					value={formData.lastname}
					onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
					required
					className='input-field'
				/>
				<input
					type="email"
					placeholder="Email"
					value={formData.email}
					onChange={(e) => setFormData({ ...formData, email: e.target.value })}
					required
					className='input-field'
				/>
				<input
					type="text"
					placeholder="ID Number"
					value={formData.idNumber}
					onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
					required
					className='input-field'
				/>
				<div className="relative">
				<input
					type={showPassword ? "text" : "password"}
					placeholder="Password"
					value={formData.password}
					onChange={(e) => setFormData({ ...formData, password: e.target.value })}
					required
					className='w-[300px] xs:w-[330px] sm:w-[360px] rounded-md border border-[#ccc] focus:ring-2 focus:ring-[#070181]'
				/>
				
				{password && (
					<button
					type="button"
					onClick={togglePasswordVisibility}
					className="absolute right-3 top-2 text-gray-500 hover:text-gray-700 focus:outline-none"
					>
					{showPassword ? <EyeOff /> : <Eye />}
					</button>
				)}
				</div>
				<select
				value={formData.department}
				onChange={(e) => setFormData({ ...formData, department: e.target.value })}
				required
				className='input-field'
				>
				<option value="" disabled>Select Department</option>
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
				value={formData.level}
				onChange={(e) => setFormData({ ...formData, level: e.target.value })}
				required
				className='input-field'
				>
				<option value="" disabled>Level</option>
				<option value="Year 1">Year 1</option>
				<option value="Year 2">Year 2</option>
				<option value="Year 3">Year 3</option>
				<option value="Year 4">Year 4</option>
				</select>
				<input 
					type="file" 
					name='image'
					required
					onChange={handleFileChange}
					className='w-[300px] xs:w-[330px] border border-[#ccc] sm:w-[360px] rounded-md'
				/>
				<button 
					type="submit" 
					className='bg-[#070181] py-2 px-5 font-Montserrat rounded-md text-white font-medium text-center flex items-center justify-center'
				>
				{isLoading ? <LoaderCircle className='animate-spin' /> : "Create Account"}
				</button>
			</form>
		</div>
    </>
  );
}

export default Signup;

