import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { AppRoutes } from '../constant';

const Header = () => {
  return (
    <AppBar position='static'>
      <Toolbar className='bg-white'>
        <Box display="flex" flexGrow={1}></Box>
        <Box display="flex" alignItems="stretch">
          <Button
            component={Link}
            to={AppRoutes.LOGIN}
          >
            Login
          </Button>
          <Button
            variant="contained"
            className='ml-1r'
            component={Link}
            to={AppRoutes.SIGNUP}
          >
            SignUp
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default React.memo(Header);
