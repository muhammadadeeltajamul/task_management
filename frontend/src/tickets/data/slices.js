import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "../../constant";

const defaultState = {
  apiStatus: {
    fetchTickets: { status: RequestStatus.INITIAL, message: ''},
    createTicket: { status: RequestStatus.INITIAL, message: ''},
  },
  tickets: [],
  selectedTicket: '',
  errorMessage: '',
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: { ...defaultState },
  reducers: {
    setTicketRequestStatus: (state, { payload }) => ({
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
    addTicket: (state, { payload }) => {
      const ticketExists = state.tickets.some(ticket => ticket.id === payload.id);
      const newState = { ...state };
      if (!ticketExists) {
        newState['tickets'] = [...state.tickets, payload];
      }
      return newState;
    },
    updateTicketsList: (state, { payload }) => ({
      ...state,
      apiStatus: {
        ...state.apiStatus,
        fetchTickets: {
          ...state.apiStatus.fetchTickets,
          status: RequestStatus.SUCCESSFUL,
        }
      },
      tickets: payload,
    }),
  }
});

export const {
  setTicketRequestStatus, addTicket, updateTicketsList,
} = ticketsSlice.actions;

export const ticketsReducer = ticketsSlice.reducer;
