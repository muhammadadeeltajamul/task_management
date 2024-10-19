import { createUrl, sendGetRequest } from "../../utils";

export const getBoardsList = async(email, password) => {
  const { data } = await sendGetRequest(
    createUrl("board/"),
    { email, password },
  )
  return data;
};
  