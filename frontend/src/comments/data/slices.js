import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "../../constant";

const defaultState = {
  apiStatus: {
    createComment: { status: RequestStatus.INITIAL, message: '' },
    fetchTicketComments: { status: RequestStatus.INITIAL, message: '' },
    updateComment: { status: RequestStatus.INITIAL, message: '' },
  },
  comments: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState: { ...defaultState },
  reducers: {
    setCommentsAPIStatus: (state, { payload }) => ({
      ...state,
      apiStatus: {
        ...state.apiStatus,
        [payload.name]: {
          ...state.apiStatus[payload.name],
          status: payload.status,
          message: payload.message || '',
        },
      },
    }),
    addComment: (state, { payload }) => ({
      ...state,
      comments: [...state.comments, payload]
    }),
    updateCommentsList: (state, { payload }) => ({
      ...state,
      comments: payload,
    }),
    updateComment: (state, { payload }) => ({
      ...state,
      comments: state.comments.map(
        comment => comment.id === payload.id
        ? { ...comment, ...payload }
        : comment
      )
    }),
  },
});

export const {
    setCommentsAPIStatus, addComment, updateCommentsList,
    updateComment,
} = commentsSlice.actions;

export const commentsReducer = commentsSlice.reducer;
