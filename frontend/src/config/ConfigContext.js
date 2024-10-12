import { createContext } from 'react';

export const defaultConfigValues = {
  API_URL: process.env.REACT_APP_API_URL,
};

const ConfigContext = createContext(defaultConfigValues);
export default ConfigContext;
