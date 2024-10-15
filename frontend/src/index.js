import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { ConfigProvider } from './config';
import './index.css';
import Navigation from './Navigation';
import store from './store';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
