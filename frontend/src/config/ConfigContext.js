import { createContext } from 'react';

export const defaultConfigValues = {
  API_URL: process.env.REACT_APP_API_URL,
  APP_NAME: process.env.REACT_APP_APP_NAME,
};

const ConfigContext = createContext(defaultConfigValues);
export default ConfigContext;
