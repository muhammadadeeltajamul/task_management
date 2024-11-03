import React from 'react';
import { generatePath, Link } from 'react-router-dom';
import {
  Avatar, Box, Card,
  CardContent, Grid2, Typography
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectBoard } from './data/selectors';
import { setAppHeader } from '../components/data/slice';
import { AppRoutes } from '../constant';

const BoardListElement = ({ boardId }) => {
  const dispatch = useDispatch();
  const board = useSelector(selectBoard(boardId));
  dispatch(setAppHeader(true));
  return (
    <Grid2
      component={Link}
      className='w-100 mx-4r text-decoration-none'
      to={generatePath(AppRoutes.BOARD, { boardId })}
    >
      <Card
        variant="outlined"
        sx={{
          p: 2,
          borderRadius: 3,
          backgroundColor: '#fff',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '150px',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.04)',
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{
              mr: 2,
              bgcolor: '#1976d2',
              color: 'white',
              width: 45,
              height: 45,
              fontSize: 24,
            }}
          >
            {board.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
              {board.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" className="text-lines-1" sx={{ mt: 0.5 }}>
              {board.description}
            </Typography>
          </Box>
        </CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 1,
            pr: 2,
          }}
        >
          <Typography variant="caption" color="textSecondary">
            Created by: {board.creator}
          </Typography>
        </Box>
      </Card>
    </Grid2>
  )
}

export default React.memo(BoardListElement);
