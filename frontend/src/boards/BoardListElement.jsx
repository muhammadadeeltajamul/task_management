import React from 'react';
import { ListItem, ListItemText, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectBoard } from './data/selectors';

const BoardListElement = ({ boardId }) => {
  const board = useSelector(selectBoard(boardId));
  return (
    <ListItem className='w-90 mx-3r px-2r'>
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

export default BoardListElement;
