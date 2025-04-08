import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
                }

                if (config.data instanceof FormData) {
                    config.headers["Content-Type"] = "multipart/form-data";
                } else {
                    config.headers["Content-Type"] = "application/json";
                }

                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;

                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true; // Ensure the request is only retried once
                    const newAccessToken = await refresh();
                    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest); // Retry request with new token
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [auth, refresh]);

    return axiosPrivate;
};

export default useAxiosPrivate;