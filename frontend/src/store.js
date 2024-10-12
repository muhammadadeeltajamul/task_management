import { configureStore } from '@reduxjs/toolkit';

const initializeStore = (preloadedState = undefined) => {
  return configureStore({
    reducer: {},
    preloadedState,
  });
}

const store = initializeStore();
export default store;
