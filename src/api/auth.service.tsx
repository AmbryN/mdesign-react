import axios from "axios";

import { LoginResponseSchema, LoginRequest } from "@api/models";

import baseUrl from "@api/baseUrl";

const login = async (loginReq: LoginRequest) => {
  let response = await axios.post(`${baseUrl}/signin`, loginReq);

  let loginData = LoginResponseSchema.parse(response.data);

  if (loginData.token) {
    localStorage.setItem("user", JSON.stringify(loginData));
  }
  return loginData;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  const userJSON = localStorage.getItem("user");
  if (userJSON) return JSON.parse(userJSON);
  else return null;
};

export { login, logout, getCurrentUser };
