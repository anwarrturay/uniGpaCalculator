import axios from "axios";
export const BASE_URL = "https://uni-gpa-calculator.onrender.com"

export default axios.create({
    baseURL: BASE_URL
})

// Creating an instance of axios.
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 
        'Content-Type': 'application/json'
    },
    withCredentials: true // for us to able to send cookies 
})