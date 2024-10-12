import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from './config';
import './index.css';
import Route from './Route';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider>
      <Route />
    </ConfigProvider>
  </React.StrictMode>
);
