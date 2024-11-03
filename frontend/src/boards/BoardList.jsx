import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid2, Typography } from '@mui/material';
import BoardListElement from './BoardListElement';
import { selectBoardList } from './data/selectors';
import { fetchBoardsList } from './data/thunks';
import { setAppHeader } from '../components/data/slice';

const BoardList = () => {
  const dispatch = useDispatch();
  const boards = useSelector(selectBoardList);
  dispatch(setAppHeader(true));

  useEffect(() => {
    dispatch(fetchBoardsList());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <Box sx={{ p: 5, minHeight: '100vh' }}>
      <Typography variant="h3" align="center" sx={{ mb: 5, color: '#333', fontWeight: 'bold', letterSpacing: '1px' }}>
        Your Boards
      </Typography>
      <Grid2 container spacing={3} justifyContent="center">
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
