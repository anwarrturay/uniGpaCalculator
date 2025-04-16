import React, {useState, useEffect} from 'react'
import useAuth from '../../hooks/useAuth';
import { axiosPrivate } from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Header from '../Header';
import {List, ListItem, Avatar} from 'flowbite-react';

const Admin = () => {
  const [users, setUsers] = useState()

  const axiosPrivate = useAxiosPrivate();
  useEffect(()=>{
      const fetchUserData = async ()=>{
  
          // if (!userId) {
          // console.error("User ID not found in localStorage.");
          // return;
          // }
  
          try{
          const response = await axiosPrivate.get(`/users/data`);
          setUsers(response.data);
          console.log(response.data)
          }catch(err){
          console.error("Error fetching user data:", err.message);
          }
      }
      fetchUserData();
  }, [])
    
  return (
    <>
    <Header />
    <main className='mt-20'>
    <List unstyled className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
      <h2 className='font-bold font-Montserrat text-center text-black'>Users({users?.length})</h2>
      {users?.map(user =>
      <ListItem className="pb-3 sm:pb-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse font-Montserrat">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{user.firstname} {user.lastname}</p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{user.idNumber}</div>
        </div>
      </ListItem>)}
      </List>
    </main>
    </>
  )
}

export default Admin