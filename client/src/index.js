/* This is importing the React library and the ReactDOM library. */
import React from 'react';
import ReactDOM from 'react-dom';

/* This is importing the bootstrap library, the index.css file, and the App.js file. */
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

/* This is rendering the App.js file to the index.html file. */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('')
);
