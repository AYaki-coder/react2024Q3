import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../../src/components/error-boundary/error-boundary';
import { ErrorButton } from '../../src/components/error-button/error-button';
import React from 'react';

describe('ErrorButton', () => {
  beforeEach(() => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>,
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('should render', () => {
    const errorButton = screen.getByText<HTMLButtonElement>('big error button');
    expect(errorButton).toBeInTheDocument();
  });

  test('should call error boundary by click', () => {
    const errorButton = screen.getByText<HTMLButtonElement>('big error button');
    fireEvent.click(errorButton);
    const errorMessage = screen.getByText('Something went wrong.');
    expect(errorButton).not.toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
  });

  test('should go back', () => {
    const errorButton = screen.getByText<HTMLButtonElement>('big error button');
    fireEvent.click(errorButton);
    const errorMessage = screen.getByText('Something went wrong.');
    const returnButton = screen.getByText('<= Back');
    fireEvent.click(returnButton);
    expect(screen.getByText<HTMLButtonElement>('big error button')).toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();
  });
});
