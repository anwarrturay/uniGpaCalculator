import axios from "../api/axios"
import useAuth from "./useAuth"
import { jwtDecode } from "jwt-decode";
const useRefreshToken = () => {

    const { auth, setAuth } = useAuth();

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
                console.log("User Roles: ", response.data.roles),
                console.log("New access token secret: ", response.data.accessToken)

                const newAccessToken = response.data.accessToken
                const decodedNewToken = jwtDecode(newAccessToken);
                console.log("Decoded Token: ", decodedNewToken);

               return {
                    ...prev, 
                    roles: decodedNewToken.roles,
                    accessToken: newAccessToken,
                    userId: decodedNewToken.userId
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