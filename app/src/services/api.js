import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";
const baseURL = isProduction ? "/api/" : "http://localhost:3001/api/";

const loginUser = (credentials) => {
  const { email, password } = credentials;
  return axios.post(`${baseURL}login`, {
    email,
    password,
  });
};

const registerUser = (credentials) => {
  const { username, email, password } = credentials;
  return axios.post(`${baseURL}register/user`, {
    username,
    email,
    password,
  });
};

export { loginUser, registerUser };
