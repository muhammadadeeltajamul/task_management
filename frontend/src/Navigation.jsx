import React, { Suspense } from 'react';
import Container from '@mui/material/Container';
import { CircularProgress, LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { selectAuthenticationRequestStatus } from './authentication/data/selectors';
import { RequestStatus, AppRoutes } from './constant';

const Login = React.lazy(() => import('./authentication/Login'));

const CircularLoader = () => (
  <div className='d-flex h-100'>
    <div className='mx-auto my-auto'>
      <CircularProgress />
    </div>
  </div>
)

const Navigation = () => {
  const authRequestStatus = useSelector(selectAuthenticationRequestStatus);
  const showLoader = authRequestStatus === RequestStatus.IN_PROGRESS;
  return (
    <Container maxWidth={false} disableGutters>
      {
        showLoader && (
          <LinearProgress
            className='z-index-100 position-fixed top-0 left-0 right-0'
          />
        )
      }
      <div className={`d-flex flex-column h-95vh ${showLoader ? '' : 'pt-4px'}`}>
        <Suspense fallback={<CircularLoader />}>
          <Routes>
            <Route path={AppRoutes.LOGIN} element={<Login />} />
          </Routes>
        </Suspense>
      </div>
    </Container>
  )
}

export default Navigation;
