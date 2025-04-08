import axios from "../api/axios"
import useAuth from "./useAuth"
import { jwtDecode } from "jwt-decode";
const useRefreshToken = () => {

    const { setAuth } = useAuth();

    const refresh  = async ()=>{
        try{
            const response = await axios.get(
                "/refresh",
                { 
                    withCredentials: true 
                }
            );
            console.log(response.data);
            setAuth((prev)=>{
                console.log("Previous auth state: ", JSON.stringify(prev)),
                console.log("New access token secret: ", response.data.accessToken)

                const decodedNewToken = jwtDecode(response.data.accessToken)
                console.log("New decoded token: ", decodedNewToken);
                const id = decodedNewToken?.id;

               return {
                    ...prev, 
                    roles: response.data.roles,
                    userId: id,
                    accessToken:response.data.accessToken
                }
            })

            return response.data.accessToken;
        }catch(err){
            console.error("Refresh Token error: ", err);
            throw new Error("Failed to refresh token");
        }
    }

    return refresh

}
export default useRefreshToken