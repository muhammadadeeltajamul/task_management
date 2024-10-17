import { createUrl, sendPostRequest } from "../../utils";

export const postUserLogin = async(email, password) => {
  const { data } = await sendPostRequest(
    createUrl("user/login/"),
    { email, password },
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
