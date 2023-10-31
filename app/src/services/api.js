import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";
const baseURL = isProduction ? "/api/" : "http://10.126.111.73:3001/api/";

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

const createChat = (name, members) => {
  return axios.post(`${baseURL}group`, {
    name,
    members,
  });
};

const getAvailableUsers = (id) => {
  return axios.get(`${baseURL}users-meta/${id}`);
};

const getUserChats = (id) => {
  return axios.get(`${baseURL}${id}/groups`);
};
const getChatById = (id) => {
    return axios.get(`${baseURL}groups/${id}`)
}

export { loginUser, registerUser, createChat, getAvailableUsers, getUserChats, getChatById };
