import axios from "axios";

const baseURL = "https://random-data-api.com/api/v2/";

export const getUser = () => {
  return axios
    .get(`${baseURL + "users?size="}${1}`)
    .then((response) => response.data);
};

export const getRandomUsers = (number) => {
  return axios
    .get(`${baseURL + "users?size="}${number}`)
    .then((response) => response.data);
};
