import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles })=>{
    const { auth } = useAuth();
    const location = useLocation();

    const roles = auth?.roles || [];

    const hasRequiredRole = Array.isArray(roles)
    ? roles.some(role => allowedRoles.includes(role))
    : allowedRoles.includes(roles); 

    return (
        hasRequiredRole 
            ? <Outlet />
            : <Navigate to='/' state={{ from:location }} replace />
    )
}

export default RequireAuth;