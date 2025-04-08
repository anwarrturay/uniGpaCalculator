import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataContextProvider = ({children}) => {
    const [loading, setLoading] = useState(true); 
    const [user, setUser] = useState(null);
    const [networkError, setNetworkError] = useState(false);
    const [userId, setUserId] = useState(null);
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist") || false));


    return <DataContext.Provider
                value = {{
                    user,setUser,
                    loading, setLoading,
                    networkError,
                    setNetworkError,
                    userId,
                    auth,
                    setAuth,
                    persist,
                    setPersist
                }}
            >{ children }</DataContext.Provider>
}

export default DataContextProvider;