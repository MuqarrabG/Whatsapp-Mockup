import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";
const baseURL = isProduction ? "/api/" : "http://hi-five-limited.onrender.com/api/";

// Define a function for logging in a user with given credentials.
const loginUser = (credentials) => {
  // Destructure email and password from the credentials object.
  const { email, password } = credentials;
  // Send a POST request using axios to the 'login' endpoint, passing the email and password.
  return axios.post(`${baseURL}login`, {
    email,
    password,
  });
};

// Define a function for registering a new user with given credentials.
const registerUser = (credentials) => {
  // Destructure username, email, and password from the credentials object.
  const { username, email, password } = credentials;
  // Send a POST request using axios to the 'register/user' endpoint with the username, email, and password.
  return axios.post(`${baseURL}register/user`, {
    username,
    email,
    password,
  });
};

// Define a function to create a new chat group with a name and a list of members.
const createChat = (name, members) => {
  // Send a POST request using axios to the 'group' endpoint with the name of the group and the member list.
  return axios.post(`${baseURL}group`, {
    name,
    members,
  });
};

// Define a function to retrieve available users' metadata by a specific user ID.
const getAvailableUsers = (id) => {
  // Send a GET request using axios to the 'users-meta' endpoint, appending the user's ID to the URL.
  return axios.get(`${baseURL}users-meta/${id}`);
};

// Define a function to get the chat groups a user is part of, using the user's ID.
const getUserChats = (id) => {
  // Send a GET request using axios to retrieve groups for a user, appending the user's ID to the URL.
  return axios.get(`${baseURL}${id}/groups`);
};

// Define a function to get information about a specific chat by its ID.
const getChatById = (id) => {
  // Send a GET request using axios to the 'groups' endpoint, appending the group's ID to retrieve its details.
  return axios.get(`${baseURL}groups/${id}`);
};


export { loginUser, registerUser, createChat, getAvailableUsers, getUserChats, getChatById };
