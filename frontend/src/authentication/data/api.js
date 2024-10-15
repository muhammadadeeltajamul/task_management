import { createUrl, sendPostRequest } from "../../utils";

export const postUserLogin = async(email, password) => {
  console.log("SENDING REQUEST");
  const { data } = await sendPostRequest(
    createUrl("user/login/"),
    { email, password },
  )
  console.log('HEY YA ', data);
  return data;
};
