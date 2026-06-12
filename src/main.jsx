import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AnalyticsListener from './components/AnalyticsListener/AnalyticsListener';
import { AuthProvider } from './context/AuthContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AnalyticsListener />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
