import { describe, vi, test, expect } from 'vitest';
import { NotFoundPage } from '../../src/pages/not-found/not-found';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { createMemoryRouter, RouterProvider } from 'react-router-dom';

describe('NotFoundPage', () => {
  test('should be defined', () => {
    expect(NotFoundPage).toBeDefined();
  });

  test('should render ', async () => {
    vi.stubGlobal('URL', { createObjectURL: () => 'someUrl' });

    const routes = [
      {
        path: '/page',
        element: <div></div>,
        errorElement: <NotFoundPage />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/persons', '/jurime'],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    const oops = await screen.findByText('Oops!');

    expect(oops).toBeInTheDocument();
  });
});
