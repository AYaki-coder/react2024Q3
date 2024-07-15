import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './components/error-boundary/error-boundary.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { NotFoundPage } from './pages/not-found/not-found.tsx';
import { DetailedPerson } from './components/detailed-person/detailed-person.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [{ index: true, element: <DetailedPerson /> }],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>,
);
