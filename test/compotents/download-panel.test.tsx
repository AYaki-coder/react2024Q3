import { describe, vi, afterEach, test, expect, afterAll } from 'vitest';
import { DownLoadPanel } from '../../src/components/download-panel/download-panel';
import { personMock } from '../person.test.data';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('DownLoadPanel', () => {
  vi.stubGlobal('URL', { createObjectURL: () => 'someUrl' });
  vi.mock('../../src/store/storeHooks', async () => {
    const mod = await vi.importActual('../../src/store/storeHooks');
    return {
      ...mod,
      useAppDispatch: () => () => {},
      useAppSelector: () => [
        { ...personMock, name: 'testName1' },
        { ...personMock, name: 'testName2' },
        { ...personMock, name: 'testName3' },
      ],
    };
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('should render the panel, when person', () => {
    render(<DownLoadPanel />);
    expect(screen.getByText('unselect all')).toBeInTheDocument();
    expect(screen.getByText('download')).toBeInTheDocument();
    expect(screen.getByText('3 items are selected')).toBeInTheDocument();
  });
});
