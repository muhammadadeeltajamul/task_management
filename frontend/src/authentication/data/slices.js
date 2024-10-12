import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "../../constant";

const defaultState = {
  status: RequestStatus.INITIAL,
  loggedIn: false,
  email: '',
  superuser: false,
  errorMessage: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: { ...defaultState },
  reducers: {
    loginUser: (state, { payload }) => ({
      ...state,
      status: RequestStatus.SUCCESSFUL,
      loggedIn: true,
      email: payload.email,
      superuser: payload.superuser,
    }),
    logoutUser: (state, { payload }) => ({
      ...defaultState,
      status: RequestStatus.SUCCESSFUL,
      loggedIn: false,
      email: '',
      superuser: false,
    }),
    loginFailed: (state, { payload }) => ({
      ...state,
      status: RequestStatus.FAILED,
      errorMessage: payload.message,
    }),
    userDenied: (state, { payload }) => ({
      ...state,
      status: RequestStatus.DENIED,
      errorMessage: payload.message,
    })
  }
});

export const {
  loginUser, logoutUser, loginFailed, userDenied,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
