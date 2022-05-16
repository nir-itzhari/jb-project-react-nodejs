import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './Components/LayoutArea/Layout/Layout';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import interceptorsService from './Services/InterceptorsService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


interceptorsService.createInterceptors();


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
