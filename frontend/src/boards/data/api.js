import {
  camelCaseObject,
  createUrl, sendGetRequest,
  sendPatchRequest, sendPostRequest,
  snakeCaseObject
} from "../../utils";

export const getBoardsList = async() => {
  const { data } = await sendGetRequest(
    createUrl("board/"),
  )
  return camelCaseObject(data);
};
  
export const getBoard = async(boardId) => {
  const { data } = await sendGetRequest(
    createUrl(`board/${boardId}`),
  )
  return camelCaseObject(data);
};

export const postNewBoard = async(name, description) => {
  const { data } = await sendPostRequest(
    createUrl("board/"),
    { name, description }
  )
  return camelCaseObject(data);
};

export const patchBoardData = async(boardId, key, value) => {
  const { data } = await sendPatchRequest(
    createUrl(`board/${boardId}/`),
    { key, value }
  )
  return camelCaseObject(data);
};

export const getMembersList = async(boardId) => {
  const { data } = await sendGetRequest(
    createUrl(`board/${boardId}/access`),
  )
  return camelCaseObject(data);
};

export const postUserBoardAccess = async(boardId, email, accessLevel) => {
  const { data } = await sendPostRequest(
    createUrl(`board/${boardId}/access`),
    snakeCaseObject({ email, accessLevel })
  )
  return camelCaseObject(data);
};
