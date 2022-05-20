import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import './App.scss'
import App from './App';
import 'bootstrap/dist/css/bootstrap.css' // or include from a CDN
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

