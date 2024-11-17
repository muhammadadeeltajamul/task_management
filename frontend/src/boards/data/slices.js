import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "../../constant";

const defaultState = {
  status: RequestStatus.INITIAL,
  newBoardFormStatus: RequestStatus.INITIAL,
  apiStatus: {
    membersListStatus: RequestStatus.INITIAL,
    updateBoardAccessStatus: RequestStatus.INITIAL,
  },
  boardUpdateStatus: RequestStatus.INITIAL,
  boards: [],
  selectedBoard: '',
  errorMessage: '',
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState: { ...defaultState },
  reducers: {
    setBoardStatusInProgress: (state, { payload }) => ({
      ...state,
      status: RequestStatus.IN_PROGRESS,
    }),
    setBoardStatusFailed: (state, { payload }) => ({
      ...state,
      status: RequestStatus.FAILED,
      errorMessage: payload,
    }),
    setBoardStatusDenied: (state, { payload }) => ({
      ...state,
      status: RequestStatus.DENIED,
      errorMessage: payload,
    }),
    addBoard: (state, { payload }) => {
      const boardExists = state.boards.some(board => board.id === payload.id);
      const newState = { ...state, status: RequestStatus.SUCCESSFUL };
      if (!boardExists) {
        newState['boards'] = [...state.boards, payload];
      }
      return newState;
    },
    updateBoardsList: (state, { payload }) => ({
      ...state,
      status: RequestStatus.SUCCESSFUL,
      boards: payload,
    }),
    updateBoard: (state, { payload }) => ({
      ...state,
      boards: state.boards.map(
        board => board.id === payload.boardId
        ? {...board, [payload.name]: payload.value}
        : board
      )
    }),
    setNewBoardStatusInProgress: (state, { payload }) => ({
      ...state,
      newBoardFormStatus: RequestStatus.IN_PROGRESS,
    }),
    setNewBoardStatusSuccessful: (state, { payload }) => ({
      ...state,
      newBoardFormStatus: RequestStatus.SUCCESSFUL,
    }),
    setNewBoardStatusFailed: (state, { payload }) => ({
      ...state,
      newBoardFormStatus: RequestStatus.FAILED,
      errorMessage: payload,
    }),
    setNewBoardStatusDenied: (state, { payload }) => ({
      ...state,
      newBoardFormStatus: RequestStatus.DENIED,
      errorMessage: payload,
    }),
    setUpdateBoardStatusInProgress: (state, { payload }) => ({
      ...state,
      boardUpdateStatus: RequestStatus.IN_PROGRESS,
    }),
    setUpdateBoardStatusSuccessful: (state, { payload }) => ({
      ...state,
      boardUpdateStatus: RequestStatus.SUCCESSFUL,
    }),
    setUpdateBoardStatusFailed: (state, { payload }) => ({
      ...state,
      boardUpdateStatus: RequestStatus.FAILED,
      errorMessage: payload,
    }),
    setUpdateBoardStatusDenied: (state, { payload }) => ({
      ...state,
      boardUpdateStatus: RequestStatus.DENIED,
      errorMessage: payload,
    }),
    updateApiRequestStatus: (state, { payload }) => ({
      ...state,
      apiStatus: {
        ...state.apiStatus,
        [payload.name]: payload.status 
      },
    }),
    updateBoardAccess: (state, { payload }) => {
      const newState = { ...state };
      const board = state.boards?.find(element => element.id === payload.boardId);
      const memberExist = board?.members.find(member => member.id === payload.access.id)
      if (memberExist) {
        newState.boards = newState.boards.map((element) => (
          element.id === payload.boardId
          ? {
            ...element,
            members: element.members.map(member => (
              member.id === payload.access.id
              ? { ...payload.access }
              : member
            ))
          }
          : element
        ))
      } else {
        newState.boards = newState.boards.map((element) => (
          element.id === payload.boardId
          ? { ...element, members: [...element.members, payload.access]}
          : element
        ));
      }
      return newState;
    },
  },
});

export const {
    setBoardStatusDenied, setBoardStatusFailed, setBoardStatusInProgress,
    updateBoardsList, addBoard, updateBoard, setNewBoardStatusInProgress,
    setNewBoardStatusFailed, setNewBoardStatusDenied, setNewBoardStatusSuccessful,
    setUpdateBoardStatusInProgress, setUpdateBoardStatusSuccessful,
    setUpdateBoardStatusFailed, setUpdateBoardStatusDenied,
    updateApiRequestStatus, updateBoardAccess,
} = boardsSlice.actions;

export const boardReducer = boardsSlice.reducer;
