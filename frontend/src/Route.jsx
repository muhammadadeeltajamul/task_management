import React from 'react';
import Container from '@mui/material/Container';
import Login from './authentication/Login';

const Route = () => {
  return (
    <Container maxWidth={false} disableGutters>
      <Login />
    </Container>
  )
}

export default Route;
