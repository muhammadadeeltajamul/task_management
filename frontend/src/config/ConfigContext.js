import { createContext } from 'react';

export const defaultConfigValues = {};

const ConfigContext = createContext(defaultConfigValues);

export default ConfigContext;
