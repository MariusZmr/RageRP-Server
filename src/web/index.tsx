import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Vom crea și un fișier CSS basic

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
