import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { PaletteContent } from '../PaletteContent';

// Mock the DataProvider
jest.mock('@providers/DataProvider/DataProvider', () => ({
  useData: () => ({
    palettes: [],
    selectedPaletteIds: [],
    setSelectedPaletteIds: jest.fn(),
  }),
}));

describe('PaletteContent', () => {
  const mockPalette = {
    id: '1',
    name: 'Test Palette',
    colors: ['#FF0000', '#00FF00', '#0000FF'],
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };

  const mockProps = {
    palette: mockPalette,
    editingColor: null,
    copiedColor: null,
    handleColorChange: jest.fn(),
    copyColor: jest.fn(),
    hexToRgb: (hex: string) => `RGB(${hex})`,
    hexToHsl: (hex: string) => `HSL(${hex})`,
  };

  it('renders palette colors in HEX format', () => {
    render(<PaletteContent {...mockProps} />);

    mockPalette.colors.forEach((color) => {
      expect(screen.getByText(color)).toBeInTheDocument();
    });
  });

  it('renders copy buttons for each color', () => {
    render(<PaletteContent {...mockProps} />);

    const copyButtons = screen.getAllByTestId('copy');
    expect(copyButtons).toHaveLength(mockPalette.colors.length);
  });
});
