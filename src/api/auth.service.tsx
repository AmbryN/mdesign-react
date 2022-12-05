import axios from "axios";

import { LoginResponseSchema, LoginRequest } from "@api/models";

import baseUrl from "@api/baseUrl";

const login = async (loginReq: LoginRequest) => {
  let response = await axios.post(`${baseUrl}/signin`, loginReq);

  let loginData = LoginResponseSchema.parse(response.data);

  if (loginData.token) {
    sessionStorage.setItem("user", JSON.stringify(loginData));
  }
  return loginData;
};

const logout = () => {
  sessionStorage.removeItem("user");
};

const getCurrentUser = () => {
  const userJSON = sessionStorage.getItem("user");
  if (userJSON) return JSON.parse(userJSON);
  else return null;
};

export { login, logout, getCurrentUser };
