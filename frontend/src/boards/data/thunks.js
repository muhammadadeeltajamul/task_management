import { getBoard, getBoardsList, patchBoardData, postNewBoard } from "./api";
import {
  addBoard, setBoardStatusDenied, setBoardStatusFailed, setBoardStatusInProgress,
  setNewBoardStatusDenied, setNewBoardStatusFailed, setNewBoardStatusInProgress,
  setNewBoardStatusSuccessful, updateBoardsList,
  setUpdateBoardStatusInProgress, setUpdateBoardStatusSuccessful,
  setUpdateBoardStatusFailed, setUpdateBoardStatusDenied,
  updateBoard,
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

export const createNewBoard = (name, description) => (
  async (dispatch) => {
    try {
      dispatch(setNewBoardStatusInProgress());
      const board = await postNewBoard(name, description);
      dispatch(addBoard(board));
      dispatch(setNewBoardStatusSuccessful());
    }
    catch(error) {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        dispatch(setNewBoardStatusDenied(error?.response?.data));
      } else {
        dispatch(setNewBoardStatusFailed(error?.response?.data));
      }
    }
  }
);

export const patchBoard = (boardId, name, value) => (
  async (dispatch) => {
    try {
      dispatch(setUpdateBoardStatusInProgress());
      await patchBoardData(boardId, name, value);
      dispatch(updateBoard({boardId, name, value}));
      dispatch(setUpdateBoardStatusSuccessful());
  }
    catch (error) {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        dispatch(setUpdateBoardStatusDenied(error?.response?.data));
      } else {
        dispatch(setUpdateBoardStatusFailed(error?.response?.data));
      }
    }
  }
);
