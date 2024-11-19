import { createSelector } from "@reduxjs/toolkit";

export const selectAllTickets = state => state.tickets.tickets;
export const selectTicketList = boardId => createSelector(
  [selectAllTickets],
  (tickets) => tickets.filter(ticket => ticket.board === boardId)
);
export const selectTicketRequestStatus = name => state => state.tickets.apiStatus[name];
export const selectTicket = ticketId => state => state.tickets.tickets.find(ticket => ticket.id === ticketId);
