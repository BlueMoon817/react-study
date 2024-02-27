import React from 'react';
import {commonFunc, Tab} from './js/test.js';
import './App.css';
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import AppTest from './AppTest.js';
import reportWebVitals from './reportWebVitals';
import $ from 'jquery';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AppTest ></AppTest>
    {window.addEventListener('load', function(){
      commonFunc(window, window.jQuery);
      Tab(window, window.jQuery);
    })}
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
