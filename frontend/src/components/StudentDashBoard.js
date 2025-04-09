import React, { useEffect } from 'react'
import Header from "./Header";
import DashBoard from "./DashBoard";
import SideBar from './SideBar';
import Loading from './utils/Loading';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from "../hooks/useAxiosPrivate"

const StudentDashBoard = ({isOpen, setIsOpen, handleClose}) => {
    const axiosPrivate = useAxiosPrivate();

    const {user, setUser, auth} = useAuth();
    const userId = auth?.userId;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosPrivate.get(`/users/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();

    }, [auth?.accessToken]);


  return (
    <>
        {user ? (
            <>
                <Header isOpen={isOpen} setIsOpen={setIsOpen} handleClose={handleClose} />
                <DashBoard isOpen={isOpen} setIsOpen={setIsOpen} />
                <SideBar isOpen={isOpen} setIsOpen={setIsOpen} handleClose={handleClose}/>
            </>
            )
            :
            (
                <Loading />
            )
        }
   </>
  )
}

export default StudentDashBoard;