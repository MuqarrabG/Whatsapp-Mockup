import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";
const baseURL = isProduction ? "/api/" : "http://localhost:3001/api/";

const loginUser = (credentials) => {
    return axios.get(baseURL, credentials);
}

export {
    loginUser
}