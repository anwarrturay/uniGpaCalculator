import React, {useState, useEffect} from 'react'
import useAuth from '../../hooks/useAuth';
import { axiosPrivate } from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Header from '../Header';
import {List, ListItem, Avatar} from 'flowbite-react';
import { v4 as uuidv4 } from 'uuid';
const Admin = () => {
  const [users, setUsers] = useState()
  const [loading, setLoading] = useState({state: false, id: ""})
  const {auth} = useAuth();
  const {userId} = auth;
  const axiosPrivate = useAxiosPrivate();
  useEffect(()=>{
      const fetchUserData = async ()=>{
          try{
          const response = await axiosPrivate.get(`/users/data`);
          const sortedResponse = response?.data.sort((a,b)=> a.roles.ADMIN ? -1 : 0)
          setUsers(sortedResponse);
          console.log(response.data)
          }catch(err){
          console.error("Error fetching user data:", err.message);
          }
      }
      fetchUserData();
  }, [])

  const makeAdmin = async (id) => {
    setLoading({state: true, id});
    try{
      const response = await axiosPrivate.post(`/admin`, {id, update: "makeAdmin"});
      if(response)setLoading({state: false, id});
      const sortedResponse = response?.data?.newUsers.sort((a,b)=> a.roles.ADMIN ? -1 : 0)
      setUsers(sortedResponse)
    }catch(err){
      setLoading({state: false, id});
      console.error("Error fetching user data:", err.message);
    }
  }
    
  const removeAdmin = async (id) => {
    setLoading({state: true, id});
    try{
      const response = await axiosPrivate.post(`/admin`, {id, update: "removeAdmin"});
      if(response)setLoading({state: false, id});
      const sortedResponse = response?.data?.newUsers.sort((a,b)=> a.roles.ADMIN ? -1 : 0)
      setUsers(sortedResponse)
    }catch(err){
      setLoading({state: false, id});
      console.error("Error fetching user data:", err.message);
    }
  }
    
  return (
    <>
    <Header />
    <main className='mt-20 px-5'>
    <List unstyled className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
      {/* <h2 className='font-bold font-Montserrat text-center text-black'>Users({users?.length})</h2> */}
      {users?.map(user => userId !== user?._id &&
      <ListItem className="pb-3 sm:pb-4" key={uuidv4()}>
        <div className="flex items-center space-x-4 rtl:space-x-reverse font-Montserrat mt-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{user.firstname} {user.lastname}</p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            {user?.roles.ADMIN ? <button className='bg-red-500 text-white p-2 text-sm rounded-sm min-w-28 flex justify-center items-center' onClick={() => removeAdmin(user._id)}>{loading.state === true && loading.id === user._id ? <LoaderCircle className='animate-spin' /> :'Remove Admin'}</button> : <button className='bg-green-500 text-white p-2 text-sm rounded-sm min-w-28 flex justify-center items-center' onClick={() => makeAdmin(user._id)}>{loading.state === true && loading.id === user._id ? <LoaderCircle className='animate-spin'/> :'Make Admin'}</button>}
          </div>
        </div>
      </ListItem>)}
      </List>
      <div className='bg-[#070181] px-2 flex items-center justify-center text-white font-Montserrat fixed bottom-5 left-5 rounded-md font-bold animate-pulse text-2xl'>
        {users?.length}
      </div>
    </main>
    </>
  )
}

export default Admin