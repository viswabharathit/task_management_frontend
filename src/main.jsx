import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/css/styles.css';
// import { ThemeProvider } from '@/components/ui/theme-provider';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  // <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <App />
  /* </ThemeProvider> */
  /* </React.StrictMode>, */
)
