import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "../../constant";

const defaultState = {
  status: RequestStatus.INITIAL,
  tickets: [],
  selectedTicket: '',
  errorMessage: '',
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: { ...defaultState },
  reducers: {
    setTicketsStatusInProgress: (state, { payload }) => ({
      ...state,
      status: RequestStatus.IN_PROGRESS,
    }),
    setTicketsStatusFailed: (state, { payload }) => ({
      ...state,
      status: RequestStatus.FAILED,
      errorMessage: payload,
    }),
    setTicketsStatusDenied: (state, { payload }) => ({
      ...state,
      status: RequestStatus.DENIED,
      errorMessage: payload,
    }),
    addTicket: (state, { payload }) => {
    const ticketExists = state.tickets.some(ticket => ticket.id === payload.id);
    const newState = { ...state, status: RequestStatus.SUCCESSFUL };
    if (!ticketExists) {
      newState['tickets'] = [...state.tickets, payload];
    }
    return newState;
  },
    updateTicketsList: (state, { payload }) => ({
      ...state,
      status: RequestStatus.SUCCESSFUL,
      tickets: payload,
    }),
  }
});

export const {
    setTicketsStatusInProgress, setTicketsStatusFailed, setTicketsStatusDenied,
    addTicket, updateTicketsList,
} = ticketsSlice.actions;

export const ticketsReducer = ticketsSlice.reducer;
