import { RequestStatus } from "../../constant";
import { getCommentsList, patchComment, postComment } from "./api";
import { addComment, setCommentsAPIStatus, updateComment, updateCommentsList } from "./slices";

export const fetchCommentsList = (boardId, ticketId) => (
  async (dispatch) => {
    const stateName = "fetchTicketComments";
    try {
      dispatch(setCommentsAPIStatus({ name: stateName, status: RequestStatus.IN_PROGRESS}));
      const data = await getCommentsList(boardId, ticketId);
      dispatch(updateCommentsList(data));
      dispatch(setCommentsAPIStatus({ name: stateName, status: RequestStatus.SUCCESSFUL}));
    } catch (error) {
      const status = [401, 403].includes(error?.response?.status) ? RequestStatus.DENIED : RequestStatus.FAILED;
      dispatch(setCommentsAPIStatus({ name: stateName, status }));
    }
  }
);

export const updateCommentData = (commentId, updatedData) => (
  async (dispatch) => {
    const stateName = "updateComment";
    try {
      dispatch(setCommentsAPIStatus({ name: stateName, status: RequestStatus.IN_PROGRESS}));
      const data = await patchComment(commentId, updatedData);
      dispatch(updateComment(data));
      dispatch(setCommentsAPIStatus({ name: stateName, status: RequestStatus.SUCCESSFUL}));
    } catch (error) {
      const status = [401, 403].includes(error?.response?.status) ? RequestStatus.DENIED : RequestStatus.FAILED;
      dispatch(setCommentsAPIStatus({ name: stateName, status }));
    }
  }
);

export const addNewComment = (ticketId, description) => (
  async (dispatch) => {
    const stateName = "createComment";
    try {
      dispatch(setCommentsAPIStatus({ name: stateName, status: RequestStatus.IN_PROGRESS}));
      const data = await postComment(ticketId, description);
      dispatch(addComment(data));
      dispatch(setCommentsAPIStatus({ name: stateName, status: RequestStatus.SUCCESSFUL}));
    } catch (error) {
      const status = [401, 403].includes(error?.response?.status) ? RequestStatus.DENIED : RequestStatus.FAILED;
      dispatch(setCommentsAPIStatus({ name: stateName, status }));
    }
  }
);
