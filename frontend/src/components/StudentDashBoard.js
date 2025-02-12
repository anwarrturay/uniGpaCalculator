import React, { useState, useEffect, useContext} from 'react'
import Header from "./Header";
import DashBoard from "./DashBoard";
import SideBar from './SideBar';
import axios from 'axios';
import { DataContext } from './context/DataContext';
import Loading from './utils/Loading';
const StudentDashBoard = ({isOpen, setIsOpen, handleClose}) => {
    const [user, setUser] = useState(null);
    const { accessToken, userId } = useContext(DataContext);

    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Include the access token in the request
                },
            });
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
        };

        
        fetchUserData();
        
    }, [accessToken]);

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