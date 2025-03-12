import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { PaletteCard } from '../PaletteCard';

// Mock the DataProvider
jest.mock('@providers/DataProvider/DataProvider', () => ({
  useData: () => ({
    groups: [
      {
        id: '1',
        name: 'Test Group',
        description: 'Test Description',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    tags: [
      {
        id: '1',
        name: 'Test Tag',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    palettes: [],
    setPalettes: jest.fn(),
  }),
}));

// Mock the date-fns
jest.mock('date-fns', () => ({
  formatDistanceToNow: () => 'mock time ago',
}));

// Mock PaletteDialog
jest.mock('../../../../organisms/Palettes/PaletteDialog/PaletteDialog', () => ({
  PaletteDialog: () => null,
}));

// Mock DeleteConfirmDialog
jest.mock(
  '../../../../molecules/General/DeleteConfirmDialog/DeleteConfirmDialog',
  () => ({
    DeleteConfirmDialog: () => null,
  })
);

describe('PaletteCard', () => {
  const mockPalette = {
    id: '1',
    name: 'Test Palette',
    colors: ['#FF0000', '#00FF00', '#0000FF'],
    tagIds: ['1'],
    groupId: '1',
    comment: 'Test comment',
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };

  it('renders palette name and colors', () => {
    render(<PaletteCard palette={mockPalette} />);

    expect(screen.getByText('Test Palette')).toBeInTheDocument();
    mockPalette.colors.forEach((color) => {
      expect(screen.getByText(color)).toBeInTheDocument();
    });
  });

  it('renders group and tag', () => {
    render(<PaletteCard palette={mockPalette} />);

    expect(screen.getByText('Test Group')).toBeInTheDocument();
    expect(screen.getByText('Test Tag')).toBeInTheDocument();
  });
});
