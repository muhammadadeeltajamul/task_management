import React from 'react'
import { useSelector } from 'react-redux';
import { selectTicketList } from './data/selectors';
import { Card, CardContent, Typography } from '@mui/material';

const TicketContainer = ({ boardId, columnName }) => {
  const tickets = useSelector(selectTicketList(boardId));
  if (tickets.length === 0) {
    return null;
  }
  const columnTickets = tickets.filter(ticket => ticket.columnName === columnName);
  return (
    <div>
      {
        columnTickets.map(ticket => {
          if (ticket.columnName !== columnName) {
            return null;
          }
          return <Card>
            <CardContent>
              <Typography variant='h6'>{ticket.title}</Typography>
              <Typography variant='body2'>{ticket.assignedTo}</Typography>
            </CardContent>
          </Card>
        })
      }
    </div>
  )
}

export default TicketContainer;
