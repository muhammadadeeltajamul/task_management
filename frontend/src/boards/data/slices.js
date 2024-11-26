import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "../../constant";

const defaultState = {
  status: RequestStatus.INITIAL,
  newBoardFormStatus: RequestStatus.INITIAL,
  apiStatus: {
    fetchBoardList: { status: RequestStatus.INITIAL, message: '' },
    fetchBoardData: { status: RequestStatus.INITIAL, message: '' },
    createBoard: { status: RequestStatus.INITIAL, message: '' },
    membersListStatus: { status: RequestStatus.INITIAL, message: '' },
    updateBoardStatus: { status: RequestStatus.INITIAL, message: '' },
    updateBoardAccessStatus: { status: RequestStatus.INITIAL, message: '' },
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
      const newState = { ...state };
      if (boardExists) {
        newState['boards'] = state.boards.map(
          board => board.id === payload.id
          ? {...board, ...payload}
          : board
        )
      } else {
        newState['boards'] = [...state.boards, payload];
      }
      return newState;
    },
    updateBoardsList: (state, { payload }) => ({
      ...state,
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
    updateApiRequestStatus: (state, { payload }) => ({
      ...state,
      boards: payload.boardId
              ? state.boards.map((board) =>
                  payload.boardId === board.id
                  ? {...board, ...payload.data} : board
                )
              : state.boards,
      apiStatus: {
        ...state.apiStatus,
        [payload.name]: {
          ...state.apiStatus[payload.name],
          status: payload.status,
          message: payload.message || '',
        },
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
    updateApiRequestStatus, updateBoardAccess,
} = boardsSlice.actions;

export const boardReducer = boardsSlice.reducer;
