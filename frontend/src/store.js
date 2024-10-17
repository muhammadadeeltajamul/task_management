import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './authentication/data/slices';
import { appReducer } from './components/data/slice';

const initializeStore = (preloadedState = undefined) => {
  return configureStore({
    reducer: {
      app: appReducer,
      user: userReducer,
    },
    preloadedState,
  });
}

const store = initializeStore();
export default store;
