import { createUrl, sendGetRequest, sendPostRequest } from "../../utils";

export const getBoardsList = async() => {
  const { data } = await sendGetRequest(
    createUrl("board/"),
  )
  return data;
};
  
export const getBoard = async(boardId) => {
  const { data } = await sendGetRequest(
    createUrl(`board/${boardId}`),
  )
  return data;
};

export const postNewBoard = async(name, description) => {
  const { data } = await sendPostRequest(
    createUrl("board/"),
    { name, description }
  )
  return data;
};
