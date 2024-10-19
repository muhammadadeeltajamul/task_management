import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "../../constant";

const defaultState = {
  status: RequestStatus.INITIAL,
  boards: [],
  selectedBoard: '',
  superuser: false,
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
    updateBoardsList: (state, { payload }) => ({
      ...state,
      status: RequestStatus.SUCCESSFUL,
      boards: payload,
    }),
  }
});

export const {
    setBoardStatusDenied, setBoardStatusFailed, setBoardStatusInProgress,
    updateBoardsList,
} = boardsSlice.actions;

export const boardReducer = boardsSlice.reducer;
