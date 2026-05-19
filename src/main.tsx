import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './utils/testApi'; // Import API test utility

// Apply dark mode class to html element
const isDarkMode = localStorage.getItem('theme-storage');
if (isDarkMode) {
  const theme = JSON.parse(isDarkMode);
  if (theme.state.isDarkMode) {
    document.documentElement.classList.add('dark');
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);