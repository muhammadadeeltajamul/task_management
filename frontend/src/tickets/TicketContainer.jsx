import React from 'react';
import { useSelector } from 'react-redux';
import { generatePath, Link, useNavigate } from 'react-router-dom';
import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import { selectTicketList } from './data/selectors';
import { AppRoutes } from '../constant';

const TicketContainer = ({ boardId, columnName }) => {
  const navigate = useNavigate();
  const tickets = useSelector(selectTicketList(boardId));
  if (tickets.length === 0) {
    return null;
  }

  const getTicketLink = (ticketId) => {
    const url = generatePath(AppRoutes.TICKET, { boardId });
    const params = new URLSearchParams({ ticketId });
    navigate(`${url}/?${params.toString()}`);
  };

  const columnTickets = tickets.filter(ticket => ticket.columnName === columnName);
  return (
    <div>
      {
        columnTickets.map(ticket => {
          if (ticket.columnName !== columnName) {
            return null;
          }
          return <Card
            key={`ticket-${columnName}-${ticket.id}`}
            onClick={() => getTicketLink(ticket.id)}
            sx={{
              borderRadius: 2,
              boxShadow: 2,
              overflow: 'hidden',
            }}
          >
            <Link className='text-decoration-none'>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" noWrap>
                  {ticket.title}
                </Typography>
                <Box display="flex" alignItems="center" mt={1} mb={1}>
                  <Avatar sx={{ bgcolor: 'grey', width: 8, height: 8, mr: 1, fontSize: '8px' }}>
                    {ticket.creator ? ticket.creator.charAt(0).toUpperCase() : ''}
                  </Avatar>
                  <Typography variant="caption" color="textSecondary" noWrap>
                    {ticket.creator}
                  </Typography>
                </Box>
              </CardContent>
            </Link>
          </Card>
        })
      }
    </div>
  )
}

export default TicketContainer;
