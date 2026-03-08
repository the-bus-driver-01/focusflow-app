import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@context/AuthContext';
import { APIProvider } from '@context/APIContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <APIProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </APIProvider>
    </Router>
  </React.StrictMode>
);
