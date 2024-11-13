import {
  createUrl, sendGetRequest,
  sendPatchRequest, sendPostRequest
} from "../../utils";

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

export const patchBoardData = async(boardId, key, value) => {
  const { data } = await sendPatchRequest(
    createUrl(`board/${boardId}`),
    { key, value }
  )
  return data;
};
