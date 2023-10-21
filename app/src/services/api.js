import axios from "axios";
import makeToast from "../components/Toaster";

const isProduction = process.env.NODE_ENV === "production";
const baseURL = isProduction ? "/api/" : "http://localhost:3001/api/";

const loginUser = (credentials) => {
    const {email, password} = credentials
    return axios.post(`${baseURL}login`, {
        email, password
    });
}

export {
    loginUser
}