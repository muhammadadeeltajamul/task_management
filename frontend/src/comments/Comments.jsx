import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Paper, Typography } from '@mui/material';
import { selectCommentsList } from './data/selectors';
import { fetchCommentsList } from './data/thunks';
import { selectUserEmail } from '../authentication/data/selectors';
import EditableTextField from '../components/EditableTextField';

const Comments = ({ ticketId }) => {
  const dispatch = useDispatch();
  const comments = useSelector(selectCommentsList);
  const userEmail = useSelector(selectUserEmail);
  useEffect(() => {
    dispatch(fetchCommentsList(ticketId));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketId]);
  return (
    <Box>
      {
        comments?.map(comment => (
          <Paper
            elevation={3}
            className="d-flex flex-column"
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
                ? <EditableTextField value={comment.description} textProps={{ variant: "body2", color: "text.secondary", className: "ml-2r" }} />
                : <Typography variant="body2" color="text.secondary" className="ml-2r">
                    {comment.description}
                  </Typography>
              }
            </Box>
          </Paper>
        ))
      }
    </Box>
  );
}

export default Comments;