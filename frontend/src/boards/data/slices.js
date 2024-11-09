import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "../../constant";

const defaultState = {
  status: RequestStatus.INITIAL,
  newBoardFormStatus: RequestStatus.INITIAL,
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
  },
});

export const {
    setBoardStatusDenied, setBoardStatusFailed, setBoardStatusInProgress,
    updateBoardsList, addBoard, setNewBoardStatusInProgress,
    setNewBoardStatusFailed, setNewBoardStatusDenied, setNewBoardStatusSuccessful,
} = boardsSlice.actions;

export const boardReducer = boardsSlice.reducer;
