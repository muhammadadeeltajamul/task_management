import React, { useContext } from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';
import { ConfigContext } from '../config';

const Footer = () => {
  const { APP_NAME } = useContext(ConfigContext);
  return (
    <AppBar position='static'>
      <Toolbar className='bg-grey 20vh align-items-top pt-1r'>
        <Box display="flex" flexGrow={0.33}>
          <>{APP_NAME}</>
        </Box>
        <Box display="flex" flexGrow={0.33}>
          <>
            Copyright &copy; 2024<br />
            Address Here
          </>
        </Box>
        <Box display="flex" flexGrow={0.33}>
            Social Links
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Footer;
