import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "../../constant";

const defaultState = {
  apiStatus: {
    createTicket: { status: RequestStatus.INITIAL, message: ''},
    fetchTickets: { status: RequestStatus.INITIAL, message: ''},
    updateTicket: { status: RequestStatus.INITIAL, message: ''},
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
    updateTicket: (state, { payload }) => ({
      ...state,
      tickets: state.tickets.map(ticket => (
        ticket.id === payload.id
        ? {...ticket, [payload.key]: payload.value}
        : ticket
      ))
    }),
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
  setTicketRequestStatus, addTicket, updateTicket, updateTicketsList,
} = ticketsSlice.actions;

export const ticketsReducer = ticketsSlice.reducer;
