import {
  camelCaseObject, createUrl, sendGetRequest,
  sendPostRequest, snakeCaseObject
} from "../../utils";

export const getTicketsList = async(boardId) => {
  const { data } = await sendGetRequest(
    createUrl("ticket/"),
    snakeCaseObject({ boardId })
  )
  return camelCaseObject(data);
};

export const postNewTicket = async(boardId, title, description, columnName) => {
  const { data } = await sendPostRequest(
    createUrl("ticket/"),
    snakeCaseObject({ boardId, title, description, columnName }),
  )
  return camelCaseObject(data);
};
