import { createUrl, sendGetRequest, sendPostRequest } from "../../utils";

export const postUserLogin = async(email, password) => {
  const { data } = await sendPostRequest(
    createUrl("user/login/"),
    { email, password },
  )
  return data;
};

export const getUserLogout = async() => {
  const { data } = await sendGetRequest(
    createUrl("user/logout/"),
  )
  return data;
};

export const getIsUserLoggedIn = async(email, password) => {
  const { data } = await sendGetRequest(
    createUrl("user/login/"),
  )
  return data;
};

export const postUserSignUp = async(email, password) => {
  const { data } = await sendPostRequest(
    createUrl("user/signup/"),
    { email, password },
  )
  return data;
};
