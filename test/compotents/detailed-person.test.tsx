import { describe, vi, afterEach, test, expect } from 'vitest';
import { DetailedPerson } from '../../src/components/detailed-person/detailed-person';
import { personMock } from '../person.test.data';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

describe('DetailedPerson', () => {
  const mocks = vi.hoisted(() => {
    return {
      useGetQuery: vi.fn(),
      useSearchParams: vi.fn(),
    };
  });

  vi.mock('../../src/store/personsApi', async () => {
    const mod = await vi.importActual('../../src/store/personsApi');
    return {
      ...mod,
      useGetQuery: mocks.useGetQuery,
    };
  });

  vi.mock('react-router-dom', async () => {
    const mod = await vi.importActual('react-router-dom');
    return {
      ...mod,
      useSearchParams: mocks.useSearchParams,
    };
  });
  vi.mock('../../src/store/storeHooks', async () => {
    const mod = await vi.importActual('../../src/store/storeHooks');
    return {
      ...mod,
      useAppDispatch: () => () => {},
    };
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('should render the relevant person data', () => {
    const setSearchParams = vi.fn();
    mocks.useSearchParams.mockReturnValue([
      new URLSearchParams(`?personId=${personMock.url.split('/').reverse()[1]}`),
      setSearchParams,
    ]);
    mocks.useGetQuery.mockImplementation(() => ({
      data: personMock,
      isLoading: false,
      isFetching: false,
    }));

    render(<DetailedPerson />);
    expect(screen.getByText(personMock.name)).toBeInTheDocument();
    expect(screen.getByText(personMock.height)).toBeInTheDocument();
    expect(screen.getByText(personMock.mass)).toBeInTheDocument();
    expect(screen.getByText(personMock.hair_color)).toBeInTheDocument();
    expect(screen.getByText(personMock.skin_color)).toBeInTheDocument();
    expect(screen.getByText(personMock.eye_color)).toBeInTheDocument();
    expect(screen.getByText(personMock.birth_year)).toBeInTheDocument();
    expect(screen.getByText(personMock.gender)).toBeInTheDocument();
  });

  test('should check that a loading indicator is displayed while fetching data', () => {
    mocks.useGetQuery.mockImplementation(() => ({ data: null, isLoading: true, isFetching: true }));

    const setSearchParams = vi.fn();
    mocks.useSearchParams.mockReturnValue([
      new URLSearchParams(`?personId=${personMock.url.split('/').reverse()[1]}`),
      setSearchParams,
    ]);

    render(<DetailedPerson />);
    expect(screen.findByTestId('loader'));
  });

  test('should hide the component by clicking the close button ', async () => {
    let mockSearchParam = new URLSearchParams(`?personId=${personMock.url.split('/').reverse()[1]}`);
    mocks.useSearchParams.mockImplementation(() => {
      const state = { params: new URLSearchParams(mockSearchParam) };
      const setParams = (a: URLSearchParams) => {
        state.params = a;
      };

      return [
        state.params,
        (newParams: URLSearchParams) => {
          mockSearchParam = newParams;
          setParams(new URLSearchParams(newParams));
        },
      ];
    });

    mocks.useGetQuery.mockImplementation(() => ({
      data: personMock,
      isLoading: false,
      isFetching: false,
    }));

    const { rerender } = render(
      <div data-testid="detailed-person-container">
        <DetailedPerson />
      </div>,
    );

    const element = await screen.findByTestId('detailed-person');
    const container = await screen.findByTestId('detailed-person-container');
    expect(element).toBeInTheDocument();
    expect(container).toBeInTheDocument();

    const closeButton = screen.getByText<HTMLButtonElement>('x');
    fireEvent.click(closeButton);

    rerender(
      <div data-testid="detailed-person-container">
        <DetailedPerson />
      </div>,
    );
    expect(container).toBeInTheDocument();
    expect(element).not.toBeInTheDocument();
  });
});
