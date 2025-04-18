import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles })=>{
    const { auth } = useAuth();
    const location = useLocation();

    const roles = auth?.roles || [];
    
    const toURL = location.pathname === "/master_ose" ? '/master_domot' : '/';

    const hasRequiredRole = Array.isArray(roles)
    ? roles.some(role => allowedRoles.includes(role))
    : allowedRoles.includes(roles); 

    return (
        hasRequiredRole 
            ? <Outlet />
            : <Navigate to={toURL} state={{ from:location }} replace />
    )
}

export default RequireAuth;