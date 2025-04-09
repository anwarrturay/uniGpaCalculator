import { createContext, useState, useEffect } from "react";

export const DataContext = createContext(null);

const DataContextProvider = ({children}) => {
    const [loading, setLoading] = useState(true); 
    const [user, setUser] = useState(null);
    const [networkError, setNetworkError] = useState(false);
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(() => {
        const storedPersist = localStorage.getItem("persist");
        return storedPersist === "true";
    });

    useEffect(()=>{
        localStorage.setItem("persist", persist)
    }, [persist])


    return <DataContext.Provider
                value = {{
                    user,setUser,
                    loading, setLoading,
                    networkError,
                    setNetworkError,
                    auth,
                    setAuth,
                    persist,
                    setPersist
                }}
            >{ children }</DataContext.Provider>
}

export default DataContextProvider;