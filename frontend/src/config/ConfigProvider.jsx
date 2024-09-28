import ConfigContext, { defaultConfigValues } from './ConfigContext';

const ConfigProvider = ({ children }) => (
  <ConfigContext.Provider value={defaultConfigValues}>
    {children}
  </ConfigContext.Provider>
);

export { ConfigContext, ConfigProvider };
