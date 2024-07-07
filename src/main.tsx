import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ApiService } from './service/api-service.ts';
import { ErrorBoundary } from './components/error-boundary/error-boundary.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App apiService={new ApiService()} />
    </ErrorBoundary>
  </React.StrictMode>,
);
