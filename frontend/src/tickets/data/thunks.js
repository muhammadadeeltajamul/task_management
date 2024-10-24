import { getTicketsList } from "./api";
import {
  setTicketsStatusDenied, setTicketsStatusFailed,
  setTicketsStatusInProgress, updateTicketsList
} from "./slices";

export const fetchTicketsList = (boardId) => (
    async (dispatch) => {
      try {
        dispatch(setTicketsStatusInProgress());
        const data = await getTicketsList(boardId);
        dispatch(updateTicketsList(data));
      } catch(error) {
        if (error.response.status === 401 || error.response.status === 403) {
          dispatch(setTicketsStatusDenied(error.response.data));
        } else {
          dispatch(setTicketsStatusFailed(error.response.data));
        }
      }
    }
  );  
  
  