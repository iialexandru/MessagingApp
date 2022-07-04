import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import './styles/scss/globals.scss';
import App from './App';
import configureStore from './store/configureStore'


const { store } = configureStore()

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
);