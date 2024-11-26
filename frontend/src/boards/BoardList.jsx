import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, CircularProgress, Grid2, Typography } from '@mui/material';
import BoardListElement from './BoardListElement';
import { selectBoardApiStatus, selectBoardList } from './data/selectors';
import { fetchBoardsList } from './data/thunks';
import { setAppHeader } from '../components/data/slice';
import NewBoardForm from './NewBoardForm';
import { RequestStatus } from '../constant';

const CircularLoader = () => (
  <div className='d-flex h-100'>
    <div className='mx-auto my-auto'>
      <CircularProgress />
    </div>
  </div>
)

const BoardList = () => {
  const dispatch = useDispatch();
  const [modalOpened, setModalOpened] = useState(false);
  const boards = useSelector(selectBoardList);
  const boardsStatus = useSelector(selectBoardApiStatus("fetchBoardList"));

  useEffect(() => {
    dispatch(setAppHeader(true));
    if (boardsStatus.status === RequestStatus.INITIAL) {
      dispatch(fetchBoardsList());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if ([RequestStatus.INITIAL, RequestStatus.IN_PROGRESS].includes(boardsStatus.status)) {
    return <CircularLoader />;
  }
  if ([RequestStatus.FAILED, RequestStatus.DENIED].includes(boardsStatus.status)) {
    return <>Error loading page</>;
  }

  return (
    <Box sx={{ p: 5, minHeight: '100vh' }}>
      <Typography variant="h4" align="center" sx={{ color: '#333', fontWeight: 'bold', letterSpacing: '1px' }}>
        Your Boards
      </Typography>
      <Box className="d-flex my-1r">
        <Button variant="outlined" className="ml-auto mr-1r" onClick={() => setModalOpened(true)}>
          Create Board
        </Button>
      </Box>
      <NewBoardForm open={modalOpened} setOpened={setModalOpened} />
      <Grid2 container spacing={1} justifyContent="center">
        {
          boards.map((board) => (
            <BoardListElement
              boardId={board.id}
              key={`board-${board.id}`}
            />
          ))    
        }
      </Grid2>
    </Box>
  )
}

export default React.memo(BoardList);
