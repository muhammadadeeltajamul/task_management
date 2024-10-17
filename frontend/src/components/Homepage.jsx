import React from 'react';
import { useDispatch } from 'react-redux';
import { setAppHeader } from './data/slice';

const Homepage = () => {
  const dispatch = useDispatch();
  dispatch(setAppHeader(true));
  return (
    <div>
      homepage
    </div>
  )
}

export default React.memo(Homepage);
