import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, beforeAll, describe, expect, test, vi } from 'vitest';
import { Person } from '../../src/components/person/person';

import * as reactRouterDom from 'react-router-dom';
import { personMock } from '../person.test.data';

describe('Person', () => {
  beforeAll(() => {
    vi.mock('../../src/store/storeHooks', async () => {
      const mod = await vi.importActual('../../src/store/storeHooks');
      return {
        ...mod,
        useAppDispatch: () => () => {},
        useAppSelector: () => [personMock],
      };
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('should render the relevant person data', () => {
    const setSearchParams = vi.fn();
    vi.spyOn(reactRouterDom, 'useSearchParams').mockReturnValue([new URLSearchParams('?page=1'), setSearchParams]);

    render(<Person person={personMock} />);
    expect(screen.getByText(personMock.name)).toBeInTheDocument();
    expect(screen.getByText(personMock.height)).toBeInTheDocument();
    expect(screen.getByText(personMock.mass)).toBeInTheDocument();
    expect(screen.getByText(personMock.hair_color)).toBeInTheDocument();
    expect(screen.getByText(personMock.skin_color)).toBeInTheDocument();
    expect(screen.getByText(personMock.eye_color)).toBeInTheDocument();
    expect(screen.getByText(personMock.birth_year)).toBeInTheDocument();
    expect(screen.getByText(personMock.gender)).toBeInTheDocument();
  });

  test('should validate that clicking on a card changes search param and navigate', () => {
    const setSearchParams = vi.fn();
    vi.spyOn(reactRouterDom, 'useSearchParams').mockReturnValue([new URLSearchParams('?personId=4'), setSearchParams]);

    const setPersonId = vi.fn();

    setSearchParams.mockImplementation((func: (data: URLSearchParams) => URLSearchParams) => {
      const oldParams = new URLSearchParams();

      const params = func(oldParams);

      return setPersonId(params.get('personId'));
    });

    render(<Person person={personMock} />);

    const nameField = screen.getByText(personMock.name);
    expect(nameField).toBeInTheDocument();
    expect(setPersonId).toHaveBeenCalledTimes(0);
    fireEvent.click(nameField);
    expect(setPersonId).toHaveBeenCalledTimes(1);
    expect(setPersonId).toHaveBeenCalledWith('1');
    const input = screen.getByRole('checkbox');
    expect(input).toBeInTheDocument();
    fireEvent.click(input);
    expect(setPersonId).toHaveBeenCalledTimes(2);
    expect(setPersonId).toHaveBeenCalledWith(null);
  });
});
