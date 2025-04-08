import { useContext } from "react";
import { DataContext } from "../components/context/DataContext";

const useAuth = ()=>{
    return useContext(DataContext);
}

export default useAuth;