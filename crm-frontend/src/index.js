// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="463673920690-5aciv2322opvor18a1a5e2nk7mt8uq4q.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
