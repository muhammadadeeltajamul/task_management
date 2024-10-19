import { createUrl, sendGetRequest } from "../../utils";

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
  