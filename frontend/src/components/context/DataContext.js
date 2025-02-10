import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

const DataContextProvider = ({children}) => {
    const [loading, setLoading] = useState(true); 
    const [user, setUser] = useState();
    const [formData, setFormData] = useState(null);
    const [networkError, setNetworkError] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
    const [userId, setUserId] = useState(null);

    const login = (token, id) => {
        setAccessToken(token);
        setUserId(id);
    };

    const logout = () => {
    setAccessToken(null);
    setUserId(null);
    };

    const fetchUser = async () => {
        try{
            const response = await axios.get('https://dummyjson.com/users/2');
            const imgResponse = await axios.get('https://picsum.photos/id/237/200', {responseType: 'blob'});
            if(response && imgResponse){
                const result = response.data
                const user = {
                    firstName: result.firstName,
                    lastName: result.lastName,
                    phone: result.phone,
                    email: result.email,
                    level: 3,
                    image: URL.createObjectURL(imgResponse.data),
                    idNumber: 8922
                }
                setUser(user)
                setFormData(user)
            }
        } catch (err) {
            setNetworkError(err.message === 'Network Error');
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return <DataContext.Provider
                value = {{
                    user,setUser,
                    loading, setLoading,
                    formData, setFormData,
                    networkError,
                    accessToken,
                    userId,
                    login,
                    logout
                }}
            >{ children }</DataContext.Provider>
}

export default DataContextProvider;