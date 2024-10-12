import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { ConfigProvider } from './config';
import './index.css';
import Route from './Route';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider>
        <Route />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
