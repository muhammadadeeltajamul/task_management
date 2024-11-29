import camelCase from "lodash.camelcase";
import { RequestStatus } from "../../constant";
import { getTicketsList, patchTicketData, postNewTicket } from "./api";
import {
  addTicket, setTicketRequestStatus, updateTicket, updateTicketsList
} from "./slices";

export const fetchTicketsList = (boardId) => (
  async (dispatch) => {
    const callName = 'fetchTickets';
    try {
      dispatch(setTicketRequestStatus({name: callName, status: RequestStatus.IN_PROGRESS}));
      const data = await getTicketsList(boardId);
      dispatch(updateTicketsList(data));
    } catch(error) {
      const status = [401, 403].includes(error?.response?.status) ? RequestStatus.DENIED : RequestStatus.FAILED;
      dispatch(setTicketRequestStatus({
        name: callName,
        status: status,
        message: error?.response?.data || ''
      }));
    }
  }
);  

export const createNewTicket = (boardId, title, description, columnName) => (
  async (dispatch) => {
    const callName = 'createTicket';
    try {
      dispatch(setTicketRequestStatus({ name: callName, status: RequestStatus.IN_PROGRESS }));
      const data = await postNewTicket(boardId, title, description, columnName);
      dispatch(addTicket(data));
      dispatch(setTicketRequestStatus({ name: callName, status: RequestStatus.SUCCESSFUL }));
    } catch(error) {
      const status = [401, 403].includes(error?.response?.status) ? RequestStatus.DENIED : RequestStatus.FAILED;
      dispatch(setTicketRequestStatus({
        name: callName,
        status: status,
        message: error?.response?.data || ''
      }));
    }
  }
);  

export const fetchUpdateTicket = (boardId, ticketId, key, value) => (
  async (dispatch) => {
    const callName = 'updateTicket';
    try {
      dispatch(setTicketRequestStatus({name: callName, status: RequestStatus.IN_PROGRESS}));
      await patchTicketData(boardId, ticketId, key, value);
      dispatch(updateTicket({id: ticketId, key: camelCase(key), value}));
      dispatch(setTicketRequestStatus({name: callName, status: RequestStatus.SUCCESSFUL}));
    } catch(error) {
      const status = [401, 403].includes(error?.response?.status) ? RequestStatus.DENIED : RequestStatus.FAILED;
      dispatch(setTicketRequestStatus({
        name: callName,
        status: status,
        message: error?.response?.data || ''
      }));
    }
  }
)