import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/scss/globals.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);