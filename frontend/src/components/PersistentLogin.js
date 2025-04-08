import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import Loading from "./utils/Loading";
import { Outlet } from "react-router-dom";

const PersistentLogin = ()=>{
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(()=>{
        let isMounted = true;
        const verifyRefreshToken = async ()=>{
            try{
                const accessToken = await refresh();
                console.log(accessToken)
            }catch(err){
                console.error(err);
            }finally{
                isMounted && setIsLoading(false);
            }
        }
        
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false); // so if the accesstoken is undefined or null then generate a new accesstoken secret else set isLoading to false.

        return ()=>{
            isMounted = false
        }
    }, [auth])


    return (
        <>
            { !persist
                ? <Outlet />
                    : isLoading 
                        ? <Loading />
                        : <Outlet />
            }
        </>
    )
}

export default PersistentLogin;