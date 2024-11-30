import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Avatar, Box, Paper, Typography } from '@mui/material';
import { selectCommentsList } from './data/selectors';
import { fetchCommentsList, updateCommentData } from './data/thunks';
import { selectUserEmail } from '../authentication/data/selectors';
import EditableTextField from '../components/EditableTextField';
import CreateComment from './CreateComment';

const Comments = ({ ticketId }) => {
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const comments = useSelector(selectCommentsList);
  const userEmail = useSelector(selectUserEmail);
  useEffect(() => {
    dispatch(fetchCommentsList(boardId, ticketId));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketId]);

  const onSaveUpdateComment = (commentId, text) => {
    dispatch(updateCommentData(commentId, { description: text }));
  };

  return (
    <>
      <Box className="d-flex flex-column my-1r" sx={{ overflowY: "auto" }}>
        {
          comments?.map(comment => (
            <Box className="d-flex flex-column w-100" sx={{ overflow: 'hidden' }}>
              <Paper
                key={comment.id}
                elevation={0}
                className="d-flex flex-column mb-1r w-100"
                sx={{
                  padding: 2,
                }}
              >
                <Box className="d-flex align-items-center w-100" sx={{ gap: 1 }}>
                  <Avatar sx={{ bgcolor: "primary.main", fontSize: '14px', width: '24px', height: '24px' }}>
                    {comment.author.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: "text.primary",
                    }}
                  >
                    {comment.author}
                  </Typography>
                </Box>
                <Box className="d-flex align-items-center w-100">
                  {
                    userEmail === comment.author
                    ? <EditableTextField
                        value={comment.description}
                        onSave={(text) => onSaveUpdateComment(comment.id, text)}
                        textProps={{ variant: "body2", color: "text.secondary", className: "ml-2r" }}
                      />
                    : <Typography variant="body2" color="text.secondary" className="ml-2r">
                        {comment.description}
                      </Typography>
                  }
                </Box>
              </Paper>
            </Box>
          ))
        }
      </Box>
      <Box className="d-flex position-sticky bottom-0 bg-white py-1r">
        <CreateComment ticketId={ticketId} />
      </Box>
    </>
  );
}

export default Comments;
