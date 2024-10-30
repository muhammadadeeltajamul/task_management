import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Modal, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectTicket } from './data/selectors';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  height: '70vh',
  width: '70vw',
  p: 4,
  padding: '1rem',
  boxShadow: 24,
  borderRadius: 2,
};

const Ticket = ({ ticketId }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const ticket = useSelector(selectTicket(ticketId));

  const goToBoard = () => {
    if (location.search) {
      navigate(location.pathname, { replace: true });
    }
  };

  if (ticket == null) {
    return null;
  }

  return (
    <div>
      <Modal open onClose={goToBoard} className='py-0'>
        <Box sx={style} className='p-2r'>
          <Box className='d-flex py-0 mx-0'>
            <Button className='ml-auto mr-0 p-0 color-red' onClick={goToBoard}>&#x2716;</Button>
          </Box>
          <Box className='ml-1r'>
            <Typography variant="h5" className='ml-0 mr-4r text-lines-1'>
              {ticket.title}
            </Typography>
            <Typography variant="body2" className='mt-1r mx-0'>
              {ticket.description}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default Ticket;
