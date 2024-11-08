import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { selectIsUserLoggedIn, selectUserEmail } from '../authentication/data/selectors';
import { fetchUserLogout } from '../authentication/data/thunks';
import { ConfigContext } from '../config';
import { AppRoutes } from '../constant';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
  const userEmail = useSelector(selectUserEmail);
  const { APP_NAME } = useContext(ConfigContext);
  const [anchorElement, setAnchorElement] = useState(null);
  const [isOpened, setIsOpened] = useState(false);

  if (isUserLoggedIn === null) {
    return null;
  }

  const onClickButton = (event) => {
    if (isOpened) {
      closeMenuBar();
    } else {
      openMenuBar(event);
    }
  };

  const openMenuBar = (event) => {
    setAnchorElement(event.target);
    setIsOpened(true);
  };

  const closeMenuBar = () => {
    setAnchorElement(null);
    setIsOpened(false);
  };

  const onLogoutClicked = async () => {
    dispatch(fetchUserLogout());
    navigate(AppRoutes.HOMEPAGE);
  }

  return (
    <AppBar position='static'>
      <Toolbar className='bg-white h-10vh'>
        <Box display="flex" flexGrow={1}>
          <Typography
            variant='h6'
            className='color-primary text-decoration-none'
            component={Link}
            to={isUserLoggedIn ? AppRoutes.BOARDS: AppRoutes.HOMEPAGE}
          >
            {APP_NAME}
          </Typography>
        </Box>
        <Box display="flex" alignItems="stretch" pr={1}>
          {
            isUserLoggedIn
            ?
              <>
                <Button
                  variant="outlined"
                  sx={{ textTransform: 'none', marginRight: '1rem' }}
                  onClick={onClickButton}
                >
                  {userEmail}                  
                </Button>
                <Menu
                    anchorEl={anchorElement}
                    onClose={closeMenuBar}
                    disableScrollLock
                    open={isOpened}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  >
                    <MenuItem onClick={onLogoutClicked}>LogOut</MenuItem>
                  </Menu>
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
