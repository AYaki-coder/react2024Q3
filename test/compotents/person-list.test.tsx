import React from 'react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { PersonList } from '../../src/components/person-list/person-list';
import { render, screen } from '@testing-library/react';

describe('PersonList', () => {
  const mocks = vi.hoisted(() => {
    return {
      useAppSelector: vi.fn(),
    };
  });

  vi.mock('../../src/store/storeHooks', async () => {
    const mod = await vi.importActual('../../src/store/storeHooks');
    return {
      ...mod,
      useAppSelector: mocks.useAppSelector,
    };
  });

  beforeEach(() => {
    vi.mock('../../src/components/person/person', () => ({
      Person: () => <div>PersonMock</div>,
    }));
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('should verify that the component renders the specified number of cards', () => {
    mocks.useAppSelector.mockImplementation(() => [
      { name: 'person1' },
      { name: 'person2' },
      { name: 'person3' },
      { name: 'person4' },
      { name: 'person5' },
    ]);

    render(<PersonList errorStatus={false} />);
    expect(screen.getAllByText('PersonMock')).toHaveLength(5);
  });

  test('should check that an appropriate message is displayed if no cards are present', () => {
    mocks.useAppSelector.mockImplementation(() => []);

    render(<PersonList errorStatus={false} />);
    expect(screen.getByText('no results')).toBeInTheDocument();
  });

  test('should check that an appropriate message is displayed if an error status is true', () => {
    mocks.useAppSelector.mockImplementation(() => []);

    render(<PersonList errorStatus={true} />);
    expect(screen.getByText('An Error has occurred')).toBeInTheDocument();
  });
});
