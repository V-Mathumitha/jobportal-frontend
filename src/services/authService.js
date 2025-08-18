import axios from "axios";

const API_URL = "http://localhost:5270/api/User";


export const registerUser = async (userData) => {
  try {
    const response = await axios.post(API_URL + "/register", userData);
    return response.data;
  } catch (error) {
    const message =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message;
    throw new Error("Registration failed: " + message);
  }
};


export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(API_URL + "/login", credentials);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error("Invalid email or password");
    }
    const message =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message;
    throw new Error("Login failed: " + message);
  }
};
