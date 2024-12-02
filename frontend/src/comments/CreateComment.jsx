import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Avatar, TextField } from '@mui/material';
import { selectBoard } from '../boards/data/selectors';
import { Actions } from '../constant';
import { addNewComment } from './data/thunks';

const CreateComment = ({ ticketId }) => {
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const board = useSelector(selectBoard(boardId));
  const [text, setText] = useState("");

  const onClickCreateComment = () => {
    const description = text.trim()
    if (description !== "") {
      dispatch(addNewComment(boardId, ticketId, description));
    }
  };

  if (!board?.permissions?.includes(Actions.CREATE_COMMENT)) {
    return null;
  }
  return (
    <>
      <TextField
        className="w-100"
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{
          flexGrow: 1,
          marginRight: '0.5rem',
        }}
      />
      <Avatar
        className="bg-transparent color-green my-auto mx-1r"
        style={{
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.2)',
          },
        }}
        onClick={onClickCreateComment}
      >
        <AddIcon />
      </Avatar>
    </>
  );
}

export default CreateComment;
