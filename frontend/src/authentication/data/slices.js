import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "../../constant";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    status: RequestStatus.INITIAL,
    loggedIn: false,
    email: '',
    superuser: false,
  },
  reducers: {}
});

export const userReducer = userSlice.reducer;
