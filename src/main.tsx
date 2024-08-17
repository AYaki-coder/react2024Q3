import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ErrorBoundary } from './components/error-boundary/error-boundary.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { NotFoundPage } from './pages/not-found/not-found.tsx';
import { ControlledForm } from './pages/controlled-form/ControlledForm.tsx';
import { Endpoints } from './types/index.ts';
import { UncontrolledForm } from './pages/uncontrolled-form/UncontrolledForm.tsx';
import { MainPage } from './pages/main-page/MainPage.tsx';
import store from './store/store.ts';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: Endpoints.ControlledForm,
    element: <ControlledForm />,
    errorElement: <NotFoundPage />,
  },
  {
    path: Endpoints.UncontrolledForm,
    element: <UncontrolledForm />,
    errorElement: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </React.StrictMode>
  </Provider>,
);
