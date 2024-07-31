import { describe, vi, test, expect } from 'vitest';
import App from '../../src/App';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../../src/store/store';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

describe('App', () => {
  test('should be in the App.tsx', () => {
    expect(App).toBeDefined();
  });

  test('should render ', () => {
    vi.stubGlobal('URL', { createObjectURL: () => 'someUrl' });

    const routes = [
      {
        path: '/',
        element: <App />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
      initialIndex: 0,
    });

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );

    expect(screen.getByTestId('appRoot')).toBeInTheDocument();
  });
});
