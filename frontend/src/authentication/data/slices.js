import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "../../constant";

const defaultState = {
  status: RequestStatus.INITIAL,
  loggedIn: null,
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
      loggedIn: false,
      status: RequestStatus.FAILED,
      errorMessage: payload.message,
    }),
    userDenied: (state, { payload }) => ({
      ...state,
      loggedIn: false,
      status: RequestStatus.DENIED,
      errorMessage: payload.message,
    }),
    userAuthenticationInProgress: (state, { payload }) => ({
      ...state,
      status: RequestStatus.IN_PROGRESS,
    })
  }
});

export const {
  loginUser, logoutUser, loginFailed, userDenied,
  userAuthenticationInProgress,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
