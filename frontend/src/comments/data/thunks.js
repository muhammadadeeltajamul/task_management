import { RequestStatus } from "../../constant";
import { getCommentsList } from "./api";
import { setCommentsAPIStatus, updateCommentsList } from "./slices";

export const fetchCommentsList = (ticketId) => (
  async (dispatch) => {
    const stateName = "fetchTicketComments";
    try {
      dispatch(setCommentsAPIStatus({ name: stateName, status: RequestStatus.IN_PROGRESS}));
      const data = await getCommentsList(ticketId);
      dispatch(updateCommentsList(data));
      dispatch(setCommentsAPIStatus({ name: stateName, status: RequestStatus.SUCCESSFUL}));
    } catch (error) {
      const status = [401, 403].includes(error?.response?.status) ? RequestStatus.DENIED : RequestStatus.FAILED;
      dispatch(setCommentsAPIStatus({ name: stateName, status }));
    }
  }
);
