import {
  camelCaseObject, createUrl, sendGetRequest,
  sendPatchRequest, sendPostRequest,
} from "../../utils";
  
export const getCommentsList = async(boardId, ticketId) => {
  const { data } = await sendGetRequest(
    createUrl(`comment/?ticket_id=${ticketId}&board_id=${boardId}`),
  )
  return camelCaseObject(data);
};

export const patchComment = async(commentId, updatedData) => {
  const { data } = await sendPatchRequest(
    createUrl(`comment/${commentId}`),
    { ...updatedData },
  )
  return camelCaseObject(data);
};

export const postComment = async(boardId, ticketId, description) => {
  const { data } = await sendPostRequest(
    createUrl(`comment/?board_id=${boardId}&ticket_id=${ticketId}`),
    { description },
  )
  return camelCaseObject(data);
};
