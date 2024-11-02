import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { selectIsUserLoggedIn } from '../authentication/data/selectors';
import { AppRoutes } from '../constant';

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate(AppRoutes.LOGIN);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserLoggedIn]);

  if (!isUserLoggedIn) {
    return null;
  }
  return <Outlet />;
}

export default ProtectedRoute;
