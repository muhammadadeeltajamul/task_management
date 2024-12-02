import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Avatar, TextField } from '@mui/material';
import { selectBoard } from '../boards/data/selectors';
import { Actions, RequestStatus } from '../constant';
import { selectCommentsAPIStatus } from './data/selectors';
import { setCommentsAPIStatus } from './data/slices';
import { addNewComment } from './data/thunks';

const CreateComment = ({ ticketId }) => {
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const board = useSelector(selectBoard(boardId));
  const statusName = 'createComment';
  const createCommentStatus = useSelector(selectCommentsAPIStatus(statusName)).status;
  const [text, setText] = useState("");

  useEffect(() => {
    if (createCommentStatus === RequestStatus.SUCCESSFUL) {
      setText("");
      dispatch(setCommentsAPIStatus(RequestStatus.INITIAL));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createCommentStatus])

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
        disabled={createCommentStatus === RequestStatus.IN_PROGRESS}
        onChange={(e) => setText(e.target.value)}
        sx={{
          flexGrow: 1,
          marginRight: '0.5rem',
        }}
      />
      <Avatar
        className="bg-transparent color-green my-auto mx-1r"
        disabled={createCommentStatus === RequestStatus.IN_PROGRESS}
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
