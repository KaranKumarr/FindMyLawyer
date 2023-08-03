import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import { AuthProvider } from './context/AuthProvider';
import { CurrentLawyerProvider } from './context/CurrentLawyerProvider';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CurrentLawyerProvider>
          <App />
        </CurrentLawyerProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);