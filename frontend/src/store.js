import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './authentication/data/slices';
import { appReducer } from './components/data/slice';
import { boardReducer } from './boards/data/slices';

const initializeStore = (preloadedState = undefined) => {
  return configureStore({
    reducer: {
      app: appReducer,
      boards: boardReducer,
      user: userReducer,
    },
    preloadedState,
  });
}

const store = initializeStore();
export default store;
