import { camelCaseObject, createUrl, sendGetRequest } from "../../utils";

export const getTicketsList = async(boardId) => {
  const { data } = await sendGetRequest(
    createUrl("ticket/"),
    { board_id: boardId }
  )
  return camelCaseObject(data);
};
