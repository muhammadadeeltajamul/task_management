import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { Box, Button, CircularProgress, Grid2, Paper, Typography } from '@mui/material';
import { selectBoard } from './data/selectors';
import { fetchBoard } from './data/thunks';
import { fetchTicketsList } from '../tickets/data/thunks';
import { selectTicketList, selectTicketsRequestStatus } from '../tickets/data/selectors';
import TicketContainer from '../tickets/TicketContainer';
import { RequestStatus } from '../constant';
import Ticket from '../tickets/Ticket';

const BoardView = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { boardId } = useParams();
  const board = useSelector(selectBoard(boardId));
  const ticketStatus = useSelector(selectTicketsRequestStatus);
  const tickets = useSelector(selectTicketList(boardId));
  const ticketId = new URLSearchParams(location.search).get('ticketId');
  const showTicket = ticketId != null;

  useEffect(() => {
    if (board == null) {
      dispatch(fetchBoard(boardId));
    }
    if (![RequestStatus.IN_PROGRESS, RequestStatus.SUCCESSFUL].includes(ticketStatus)) {
      dispatch(fetchTicketsList(boardId));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board])

  if (board == null) {
    return null;
  }
  const columns = board.columns;
  return (
    <>
      { showTicket && <Ticket ticketId={ticketId} /> }
      <div className="d-flex flex-column m-1r">
        <div className='d-flex flex-row mb-1r'>
          <Typography variant="h6" className='ml-1r mr-auto'>{board.name}</Typography>
          <Button className='ml-auto mr-1r'>
            Manage Board
          </Button>
        </div>
        <Grid2 container>
          {
            ticketStatus === RequestStatus.IN_PROGRESS &&
            <CircularProgress />
          }
          {
            [RequestStatus.FAILED, RequestStatus.DENIED].includes(ticketStatus) &&
            <div>Error Loading Tickets</div>
          }
          {
            ticketStatus === RequestStatus.SUCCESSFUL &&
            columns.map((columnName, idx) => (
              <Grid2 key={`column-${idx}-${columnName}`} className="min-h-60vh" style={{ flexBasis: `${100 / columns.length}%` }}>
                <Box className="d-flex flex-column" justifyContent="stretch">
                  <Paper className='mx-auto flex-grow-1 w-100 text-align-center'>
                    {columnName}
                  </Paper>
                </Box>
                <Box>
                  { tickets.length !== 0
                    ? <TicketContainer boardId={boardId} columnName={columnName} />
                    : null
                  }
                </Box>
              </Grid2>
            ))
          }
        </Grid2>
      </div>
    </>
  );
}

export default React.memo(BoardView);
