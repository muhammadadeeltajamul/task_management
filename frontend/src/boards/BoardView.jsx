import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { Box, Button, CircularProgress, Grid2, Paper, Typography } from '@mui/material';
import BoardMembers from './BoardMembers';
import ManageBoard from './ManageBoard';
import { selectBoard, selectBoardAccesslevel } from './data/selectors';
import { fetchBoard } from './data/thunks';
import { selectTicketList, selectTicketsRequestStatus } from '../tickets/data/selectors';
import { AccessLevel, RequestStatus } from '../constant';
import { fetchTicketsList } from '../tickets/data/thunks';
import Ticket from '../tickets/Ticket';
import TicketContainer from '../tickets/TicketContainer';

const BoardView = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { boardId } = useParams();
  const [openManageBoard, setOpenManageBoard] = useState(false);
  const [openBoardMembers, setOpenBoardMembers] = useState(false);
  const board = useSelector(selectBoard(boardId));
  const ticketStatus = useSelector(selectTicketsRequestStatus);
  const tickets = useSelector(selectTicketList(boardId));
  const accessLevel = useSelector(selectBoardAccesslevel(boardId));
  console.log('user access ', accessLevel);
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
  }, [board, boardId])

  if (board == null) {
    return null;
  }
  const columns = board.columns;
  const columnLength = Math.max(Math.min(100 / columns.length, 25), 40);
  return (
    <>
      { showTicket && <Ticket ticketId={ticketId} /> }
      <Box className="d-flex flex-column m-1r">
        <Box className='d-flex flex-row mb-1r'>
          <Typography variant="h6" className='ml-1r mr-auto'>{board.name}</Typography>
          {
            accessLevel === AccessLevel.OWNER && (
              <Button className='ml-auto mr-1r' onClick={() => setOpenBoardMembers(true)}>
                Members
              </Button>
            )
          }
          <Button className='mr-1r' onClick={() => setOpenManageBoard(true)}>
            Manage Board
          </Button>
        </Box>
        <Box container="true" className="d-flex flex-row overflow-x-auto hide-scrollbar">
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
              <Grid2 key={`column-${idx}-${columnName}`} className="min-h-60vh" style={{ flexBasis: `${columnLength}%`, minWidth: '200px', flexShrink: 0, }}>
                <Box className="d-flex flex-column" justifyContent="stretch" sx={{ padding: '0px 2px'}}>
                  <Paper
                    className='d-flex flex-column justify-content-center mx-auto flex-grow-1 w-100 text-align-center mx-1r'
                    sx={{
                      backgroundColor: '#f5f5f5',
                      fontSize: '1.2rem',
                      fontWeight: 500,
                      height: '32px',
                    }}
                  >
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
        </Box>
      </Box>
      <ManageBoard
        boardId={boardId}
        open={openManageBoard}
        setOpened={setOpenManageBoard}
      />
      <BoardMembers
        boardId={boardId}
        open={openBoardMembers}
        setOpened={setOpenBoardMembers}
      />
    </>
  );
}

export default React.memo(BoardView);
