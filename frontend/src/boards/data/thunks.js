import { getBoard, getBoardsList } from "./api";
import {
  addBoard,
  setBoardStatusDenied,
  setBoardStatusFailed,
  setBoardStatusInProgress,
  updateBoardsList
} from "./slices";

export const fetchBoardsList = () => (
  async (dispatch) => {
    try {
      dispatch(setBoardStatusInProgress());
      const data = await getBoardsList();
      dispatch(updateBoardsList(data));
    } catch(error) {
      if (error.response.status === 401 || error.response.status === 403) {
        dispatch(setBoardStatusDenied(error.response.data));
      } else {
        dispatch(setBoardStatusFailed(error.response.data));
      }
    }
  }
);  

export const fetchBoard = (boardId) => (
  async (dispatch) => {
    try {
      dispatch(setBoardStatusInProgress());
      const data = await getBoard(boardId);
      dispatch(addBoard(data));
    } catch(error) {
      if (error.response.status === 401 || error.response.status === 403) {
        dispatch(setBoardStatusDenied(error.response.data));
      } else {
        dispatch(setBoardStatusFailed(error.response.data));
      }
    }
  }
);  
