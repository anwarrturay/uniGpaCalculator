import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Send, ArrowRight } from 'lucide-react';
import { FAQs } from './utils/FAQs';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import contactusSchema from '../schemas/contactusSchema';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import SuccessFeedbackMsg from './utils/SuccessFeedbackMsg';
import Failure from "./utils/Failure";
const ContactUs = () => {
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const {register, handleSubmit, formState: {errors}, reset, watch, setValue} = useForm({
    resolver: yupResolver(contactusSchema),
    defaultValues:{
      "email": ""
    }
  })

  const { auth } = useAuth();
  const userId = auth?.userId;

  useEffect(()=>{
    const fetchUserEmail = async ()=>{
      if(!userId) return;
      try{
        const res = await axiosPrivate.get(
          `/users/${userId}`
        )
        if(res.data){
          setValue("email", res.data.email || '')
        }
      }catch(err){
        console.error("Error Fetching User Data", {
          message: err.message,
          cause: err.cause
        })
      }
    }

    if(userId) fetchUserEmail();
  }, [axiosPrivate, watch])
  
  const handleFeedbacks = async (data) => {
    try{
      const response = await axiosPrivate.post(
        `/users/contact-us`,
        JSON.stringify({email:data.email, issue:data.issue, message:data.message})
      )
      if(response.status === 200){
        setSuccess(true)
        setTimeout(()=>{
          setSuccess(false)
        }, 5000)
        reset()
      }
    }catch(err){
      if(!err?.response){
        setErrMsg("Something Went Wrong");
      }else if(err.response?.status === 400){
        setErrMsg("Unable to send your feedback")
      }
    }
  };

  return (
    <section>
      <Header />
      <main className="relative top-20 xl:top-32 font-Montserrat flex justify-center items-start px-5 scroll-smooth">
        <div className="flex flex-col justify-start xl:flex-row gap-12 max-w-6xl w-full">
          {/* FAQs Section */}
          <div className="w-full xl:w-1/2">
            <div className='mb-6'>
              <h1 className="font-bold text-2xl mb-1">FAQs</h1>
              <p className="text-[12px] text-[#8b8b8b]">These are the frequently asked questions from others users and to answer these questions navigate to your dashboard and tap on tips.</p>
            </div>
            <ul className="space-y-2 text-gray-700 font-medium">
              {FAQs.map(question=>(
                <li className='flex' key={uuidv4()}>
                  <ArrowRight className='mr-2'/>
                  {question}
                </li>
              ))}
            </ul>
          </div>

          {/* Vertical Divider */}
          <div className="hidden xl:flex justify-center">
            <div className="h-full w-px bg-[#ccc]" />
          </div>

          {/* Contact Form Section */}
          <div className="w-full xl:w-1/2">
            <h1 className="text-2xl font-bold mb-1">Contact Us</h1>
            <p className="text-[#8b8b8b] mb-6 text-[12px]">
              We'd love to hear from you! Whether you're reporting a bug, suggesting improvements, or sharing your experience, your feedback helps us make things better.
            </p>
              {success ? (<SuccessFeedbackMsg />) : (errMsg && <Failure errMsg={errMsg}/>)}
            <form onSubmit={handleSubmit(handleFeedbacks, (errors)=> console.log("Validation error: ", errors))} className="space-y-4 mb-3">
              <div className="flex flex-col">
                <label htmlFor="user-email">Email</label>
                <input 
                  id='user-email'
                  type="text" 
                  value={watch("email")}
                  {...register("email")}
                  className='input-field'
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="categories-issue" className="mb-1 font-medium">Category</label>
                <select 
                  id="categories-issue" 
                  className="input-field"
                  {...register("issue")}
                >
                  <option value="Bug Issues">Bug Issue</option>
                  <option value="Performances">Performance Issue</option>
                  <option value="System Optimization">System Optimization</option>
                  <option value="Compliment">Compliment</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="message" className="mb-1 font-medium">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  className="input-field w-full min-h-[100px] max-h-[300px] overflow-y-auto resize-y"
                  placeholder="Type your message here"
                  {...register("message")}
                ></textarea>
              </div>

              <button type="submit" className="bg-[#070181] text-white px-4 py-2 rounded-md flex items-center justify-center hover:bg-gray-800 font-medium w-[300px] xs:w-[330px] sm:w-[360px]">
                Send
                <Send className="ml-2" />
              </button>
            </form>
          </div>

        </div>
      </main>
    </section>
  );
};

export default ContactUs;
