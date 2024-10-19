import React from 'react';
import { generatePath, Link } from 'react-router-dom';
import { ListItem, ListItemText, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectBoard } from './data/selectors';
import { AppRoutes } from '../constant';

const BoardListElement = ({ boardId }) => {
  const board = useSelector(selectBoard(boardId));
  return (
    <ListItem
      className='w-90 mx-3r px-2r'
      component={Link}
      to={generatePath(AppRoutes.BOARD, { boardId })}
    >
      <ListItemText
        primary={
          <Typography variant="h5">
            {board.name}
          </Typography>
        }
        secondary={
          <>
            <Typography
              component="span"
              variant="body3"
              color="textPrimary"
              className="text-lines-1"
            >
              {board.description}
            </Typography>
            <Typography variant="caption" display="block" color="textSecondary">
              {board.creator}
            </Typography>
          </>
        }
      />
    </ListItem>
  )
}

export default React.memo(BoardListElement);
