import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
// for antdesign to work
import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App /> 
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

