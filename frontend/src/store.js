import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './authentication/data/slices';

const initializeStore = (preloadedState = undefined) => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
    preloadedState,
  });
}

const store = initializeStore();
export default store;
