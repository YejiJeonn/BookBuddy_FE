import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import Login from './components/Login'
import SignUp from "./components/SignUp";
import Header from "./components/Header";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header/>
      <SignUp/>
  </React.StrictMode>
);

reportWebVitals();
