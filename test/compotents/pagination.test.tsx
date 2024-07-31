import { describe, afterEach, vi, test, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import * as reactRouterDom from 'react-router-dom';
import React from 'react';
import { Pagination } from '../../src/components/pagination/pagination';

describe('Pagination', () => {
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

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('should render', () => {
    const setSearchParams = vi.fn();
    vi.spyOn(reactRouterDom, 'useSearchParams').mockReturnValue([new URLSearchParams('?page=1'), setSearchParams]);
    mocks.useAppSelector.mockImplementation(() => 7);

    render(<Pagination />);
    expect(screen.queryByTestId('pagination')).toBeTruthy();
    const navButtons = screen.getAllByRole('button');
    expect(navButtons).toHaveLength(2);
  });

  test('should not render', () => {
    const setSearchParams = vi.fn();
    vi.spyOn(reactRouterDom, 'useSearchParams').mockReturnValue([new URLSearchParams('?page=1'), setSearchParams]);
    mocks.useAppSelector.mockImplementation(() => 0);

    render(<Pagination />);
    expect(screen.queryByTestId('pagination')).toBeFalsy();
  });

  test('should render prev button as disabled', () => {
    const setSearchParams = vi.fn();
    vi.spyOn(reactRouterDom, 'useSearchParams').mockReturnValue([new URLSearchParams('?page=1'), setSearchParams]);
    mocks.useAppSelector.mockImplementation(() => 7);
    render(<Pagination />);

    expect(screen.getByRole('button', { name: /prev/i })).toBeDisabled();
  });

  test('should render next button as disabled', () => {
    const setSearchParams = vi.fn();
    vi.spyOn(reactRouterDom, 'useSearchParams').mockReturnValue([new URLSearchParams('?page=2'), setSearchParams]);
    mocks.useAppSelector.mockImplementation(() => 16);
    render(<Pagination />);

    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
  });

  test('should go to next page', () => {
    const setSearchParams = vi.fn();
    const spyPage = vi.fn();
    vi.spyOn(reactRouterDom, 'useSearchParams').mockReturnValue([new URLSearchParams('?page=2'), setSearchParams]);
    mocks.useAppSelector.mockImplementation(() => 61);
    setSearchParams.mockImplementation((param: URLSearchParams) => {
      const page = param.get('page');
      spyPage(page);
    });

    render(<Pagination />);

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(spyPage).toBeCalledTimes(1);
    expect(spyPage).toBeCalledWith('3');
  });

  test('should go to previous page', () => {
    const setSearchParams = vi.fn();
    const spyPage = vi.fn();
    vi.spyOn(reactRouterDom, 'useSearchParams').mockReturnValue([new URLSearchParams('?page=5'), setSearchParams]);
    mocks.useAppSelector.mockImplementation(() => 61);
    setSearchParams.mockImplementation((param: URLSearchParams) => {
      const page = param.get('page');
      spyPage(page);
    });

    render(<Pagination />);

    const prevButton = screen.getByRole('button', { name: /prev/i });
    expect(prevButton).toBeInTheDocument();
    fireEvent.click(prevButton);
    expect(spyPage).toBeCalledTimes(1);
    expect(spyPage).toBeCalledWith('4');
  });
});
