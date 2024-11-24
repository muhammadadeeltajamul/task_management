import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import { Avatar, TextField } from '@mui/material';
import { addNewComment } from './data/thunks';

const CreateComment = ({ ticketId }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const onClickCreateComment = () => {
    const description = text.trim()
    if (description !== "") {
      dispatch(addNewComment(ticketId, description));
    }
  };

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
