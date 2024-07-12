import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import Fallback from './components/Fallback.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<Fallback />}>
    <App />
    </ErrorBoundary>

  </React.StrictMode>,
);
