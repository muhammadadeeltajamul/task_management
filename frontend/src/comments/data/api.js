import {
  camelCaseObject, createUrl, sendGetRequest,
} from "../../utils";
  
export const getCommentsList = async(ticketId) => {
  const { data } = await sendGetRequest(
    createUrl(`comment/?ticket_id=${ticketId}`),
  )
  return camelCaseObject(data);
};
