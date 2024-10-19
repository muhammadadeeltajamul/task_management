import React, { Suspense, useEffect } from 'react';
import Container from '@mui/material/Container';
import { CircularProgress, LinearProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { selectAuthenticationRequestStatus, selectIsUserLoggedIn } from './authentication/data/selectors';
import { RequestStatus, AppRoutes } from './constant';
import { selectShowHeader } from './components/data/selectors';
import Header from './components/Header';
import { fetchIsUserLoggedIn } from './authentication/data/thunks';

const Homepage = React.lazy(() => import('./components/Homepage'));
const Login = React.lazy(() => import('./authentication/Login'));
const SignUp = React.lazy(() => import('./authentication/SignUp'));

const CircularLoader = () => (
  <div className='d-flex h-100'>
    <div className='mx-auto my-auto'>
      <CircularProgress />
    </div>
  </div>
)

const Navigation = () => {
  const dispatch = useDispatch();
  const authRequestStatus = useSelector(selectAuthenticationRequestStatus);
  const showHeader = useSelector(selectShowHeader);
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

  useEffect(() => {
    if (isUserLoggedIn === null) {
      dispatch(fetchIsUserLoggedIn());
    }
  }, [isUserLoggedIn])
  
  const showLoader = authRequestStatus === RequestStatus.IN_PROGRESS;
  if (isUserLoggedIn === null) {
    return <Container maxWidth={false} disableGutters>
      <div className='d-flex flex-column h-100vh'>
        <CircularLoader />
      </div>
    </Container>
  }
  return (
    <Container maxWidth={false} disableGutters>
      {
        showLoader && (
          <LinearProgress
            className='z-index-100 position-fixed top-0 left-0 right-0'
          />
        )
      }
      { showHeader && <Header /> }
      <div className={`d-flex flex-column h-90vh ${showLoader ? '' : 'pt-4px'}`}>
        <Suspense fallback={<CircularLoader />}>
          <Routes>
            <Route path={AppRoutes.LOGIN} element={<Login exact />} />
            <Route path={AppRoutes.SIGNUP} element={<SignUp exact />} />
            <Route path={AppRoutes.HOMEPAGE} element={<Homepage exact />} />
          </Routes>
        </Suspense>
      </div>
    </Container>
  )
}

export default Navigation;
