import { RequestStatus } from "../../constant";
import { getBoard, getBoardsList, getMembersList, patchBoardData, postNewBoard, postUserBoardAccess } from "./api";
import {
  addBoard, updateBoardsList, updateApiRequestStatus,
  updateBoard, updateBoardAccess,
} from "./slices";

export const fetchBoardsList = () => (
  async (dispatch) => {
    const statusName = "fetchBoardList";
    try {
      dispatch(updateApiRequestStatus({ name: statusName, status: RequestStatus.IN_PROGRESS }));
      const data = await getBoardsList();
      dispatch(updateBoardsList(data));
      dispatch(updateApiRequestStatus({ name: statusName, status: RequestStatus.SUCCESSFUL }));
    } catch(error) {
      const status = [401, 403].includes(error?.response?.status) ? RequestStatus.DENIED : RequestStatus.FAILED;
      dispatch(updateApiRequestStatus({ name: statusName, status }));
    }
  }
);  

export const fetchBoard = (boardId) => (
  async (dispatch) => {
    const statusName = "fetchBoardData";
    try {
      dispatch(addBoard({ id: boardId }));
      dispatch(updateApiRequestStatus({ name: statusName, status: RequestStatus.IN_PROGRESS }));
      const data = await getBoard(boardId);
      dispatch(addBoard(data));
      dispatch(updateApiRequestStatus({ name: statusName, status: RequestStatus.SUCCESSFUL }));
    } catch(error) {
      const status = [401, 403].includes(error?.response?.status) ? RequestStatus.DENIED : RequestStatus.FAILED;
      dispatch(updateApiRequestStatus({ name: statusName, status, boardId, data: { error: true, errorMessage: error?.response?.data?.detail } }));
    }
  }
);  

export const createNewBoard = (name, description) => (
  async (dispatch) => {
    const statusName = "createBoard";
    try {
      dispatch(updateApiRequestStatus({ name: statusName, status: RequestStatus.IN_PROGRESS }));
      const board = await postNewBoard(name, description);
      dispatch(addBoard(board));
      dispatch(updateApiRequestStatus({ name: statusName, status: RequestStatus.SUCCESSFUL }));
    }
    catch(error) {
      const status = [401, 403].includes(error?.response?.status) ? RequestStatus.DENIED : RequestStatus.FAILED;
      dispatch(updateApiRequestStatus({ name: statusName, status, data: { error: true, errorMessage: error?.response?.data?.detail } }));
    }
  }
);

export const patchBoard = (boardId, name, value) => (
  async (dispatch) => {
    const statusName = "updateBoardStatus";
    try {
      dispatch(updateApiRequestStatus({ name: statusName, status: RequestStatus.IN_PROGRESS }));
      await patchBoardData(boardId, name, value);
      dispatch(updateBoard({boardId, name, value}));
      dispatch(updateApiRequestStatus({ name: statusName, status: RequestStatus.SUCCESSFUL }));
    } catch (error) {
      const errorStatus = [401, 403].includes(error?.response?.status) ? RequestStatus.DENIED : RequestStatus.FAILED;
      dispatch(updateApiRequestStatus({ name: statusName, status: errorStatus }));
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
