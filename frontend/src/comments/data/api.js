import {
  camelCaseObject, createUrl, sendGetRequest,
  sendPatchRequest, sendPostRequest,
} from "../../utils";
  
export const getCommentsList = async(ticketId) => {
  const { data } = await sendGetRequest(
    createUrl(`comment/?ticket_id=${ticketId}`),
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

export const postComment = async(ticketId, description) => {
  const { data } = await sendPostRequest(
    createUrl(`comment/?ticket_id=${ticketId}`),
    { description },
  )
  return camelCaseObject(data);
};
