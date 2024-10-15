import axios from 'axios';
import ConfigContext, { defaultConfigValues } from './ConfigContext';

axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const ConfigProvider = ({ children }) => (
  <ConfigContext.Provider value={defaultConfigValues}>
    {children}
  </ConfigContext.Provider>
);

export { ConfigContext, ConfigProvider };
