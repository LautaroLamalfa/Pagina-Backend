import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';
import { Provider } from 'react-redux'; 
import store from './redux/store';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
