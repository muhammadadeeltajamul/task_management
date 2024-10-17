import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  showHeader: true,
};

const appSlice = createSlice({
  name: 'app',
  initialState: { ...defaultState },
  reducers: {
    setAppHeader: (state, { payload }) => ({
      ...state,
      showHeader: payload,
    }),
  }
});

export const {
  setAppHeader,
} = appSlice.actions;

export const appReducer = appSlice.reducer;
