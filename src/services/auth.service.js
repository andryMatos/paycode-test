import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://mapi.paycode.com.mx/api/challenge/";

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("userToken", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const getUserData = () => {
  return axios
    .get(API_URL + "me",
      {
        headers: authHeader()
      }
    )
    .then((response) => {
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("userToken");
};

// eslint-disable-next-line
export default {
  login,
  logout,
  getUserData,
};
