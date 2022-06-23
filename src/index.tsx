import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import authReducer from './features/Authenticated'

import './styles/scss/globals.scss';
import App from './App';


const store = configureStore({
  reducer: {
    auth: authReducer
  }
})


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);