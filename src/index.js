import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import header from "./components/Header";

import Login from './pages/Login'
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import {BrowserRouter} from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <header />
        <App/>
    </BrowserRouter>
  // <React.StrictMode>
  //   <Header/>
  //     {/*<SignUp/>*/}
  // </React.StrictMode>
);

reportWebVitals();
