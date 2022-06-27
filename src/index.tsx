import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'

import './styles/scss/globals.scss';
import App from './App';
import configureStore from './store/configureStore'


const { store } = configureStore()

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);