import { RequestStatus } from "../../constant";
import { getBoard, getBoardsList, getMembersList, patchBoardData, postNewBoard, postUserBoardAccess } from "./api";
import {
  addBoard, setBoardStatusDenied, setBoardStatusFailed, setBoardStatusInProgress,
  setNewBoardStatusDenied, setNewBoardStatusFailed, setNewBoardStatusInProgress,
  setNewBoardStatusSuccessful, updateBoardsList, updateApiRequestStatus,
  updateBoard, updateBoardAccess,
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
      dispatch(updateApiRequestStatus({ name: "updateBoardStatus", status: RequestStatus.IN_PROGRESS }));
      await patchBoardData(boardId, name, value);
      dispatch(updateBoard({boardId, name, value}));
      dispatch(updateApiRequestStatus({ name: "updateBoardStatus", status: RequestStatus.SUCCESSFUL }));
    } catch (error) {
      const errorStatus = [401, 403].includes(error?.response?.status) ? RequestStatus.DENIED : RequestStatus.FAILED;
      dispatch(updateApiRequestStatus({ name: "updateBoardStatus", status: errorStatus }));
    }
  }
);

export const fetchMembersList = (boardId) => (
  async (dispatch) => {
    const stateName = "membersListStatus";
    try {
      dispatch(updateApiRequestStatus({ name: stateName, status: RequestStatus.IN_PROGRESS}));
      const data = await getMembersList(boardId);
      dispatch(updateBoard({boardId, name: 'members', value: data}));
      dispatch(updateApiRequestStatus({ name: stateName, status: RequestStatus.SUCCESSFUL}));
    } catch (error) {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        dispatch(updateApiRequestStatus({ name: stateName, status: RequestStatus.DENIED}));
      } else {
        dispatch(updateApiRequestStatus({ name: stateName, status: RequestStatus.FAILED}));
      }
    }
  }
);

export const updateUserBoardAccess = (boardId, email, accessLevel) => (
  async (dispatch) => {
    const stateName = "updateBoardAccessStatus";
    try {
      dispatch(updateApiRequestStatus({ name: stateName, status: RequestStatus.IN_PROGRESS}));
      const data = await postUserBoardAccess(boardId, email, accessLevel);
      dispatch(updateBoardAccess({boardId, access: data}));
      dispatch(updateApiRequestStatus({ name: stateName, status: RequestStatus.SUCCESSFUL}));
    } catch (error) {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        dispatch(updateApiRequestStatus({ name: stateName, status: RequestStatus.DENIED}));
      } else {
        dispatch(updateApiRequestStatus({ name: stateName, status: RequestStatus.FAILED}));
      }
    }
  }
)
