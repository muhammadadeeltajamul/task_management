import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from './config';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider>
      <div>App</div>
    </ConfigProvider>
  </React.StrictMode>
);
