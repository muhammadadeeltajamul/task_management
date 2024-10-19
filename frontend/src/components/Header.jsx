import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { selectIsUserLoggedIn, selectUserEmail } from '../authentication/data/selectors';
import { AppRoutes } from '../constant';

const Header = () => {
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
  const userEmail = useSelector(selectUserEmail);
  if (isUserLoggedIn === null) {
    return null;
  }
  return (
    <AppBar position='static'>
      <Toolbar className='bg-white h-10vh'>
        <Box display="flex" flexGrow={1}></Box>
        <Box display="flex" alignItems="stretch">
          {
            isUserLoggedIn
            ?
              <>
                <Button
                  variant="outlined"
                  sx={{ textTransform: 'none' }}
                >
                  {userEmail}
                </Button>
              </>
            :
              <>
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
              </>
          }
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default React.memo(Header);
