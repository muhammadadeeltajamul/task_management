import React from 'react';
import { useSelector } from 'react-redux';
import { generatePath, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
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
          >
            <Link className='text-decoration-none'>
              <CardContent>
                <Typography variant='h6'>{ticket.title}</Typography>
                <Typography variant='body2'>{ticket.assignedTo}</Typography>
              </CardContent>
            </Link>
          </Card>
        })
      }
    </div>
  )
}

export default TicketContainer;
