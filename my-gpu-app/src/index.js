import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Chatbox from './components/Chatbox';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Chatbox />
  </React.StrictMode>,
  document.getElementById('chatbox-container')
);

reportWebVitals();
