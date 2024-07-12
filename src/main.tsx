import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ApiService } from './service/api-service.ts';
import { ErrorBoundary } from './components/error-boundary/error-boundary.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { NotFoundPage } from './pages/not-found/not-found.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App apiService={new ApiService()} />,
    errorElement: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>,
);
