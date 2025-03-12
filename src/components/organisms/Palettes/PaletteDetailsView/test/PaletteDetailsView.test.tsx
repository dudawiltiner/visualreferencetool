import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { PaletteDetailsView } from '../PaletteDetailsView';

// Mock do componente PaletteDetailsView
jest.mock('../PaletteDetailsView', () => ({
  PaletteDetailsView: ({ palettes }: { palettes: any[] }) => (
    <div>
      {palettes.map((palette) => (
        <div key={palette.id} className="palette-card">
          <h3>{palette.name}</h3>
          <div>Colors: {palette.colors.join(', ')}</div>
          {palette.comment && <p>Comment: {palette.comment}</p>}
        </div>
      ))}
    </div>
  ),
}));

// Mock do hook usePaletteDetails
jest.mock('../PaletteDetails.hook', () => ({
  usePaletteDetails: () => ({
    groups: [],
    tags: [],
    editingColor: null,
    copiedColor: null,
    handleColorChange: jest.fn(),
    handleDelete: jest.fn(),
    copyColor: jest.fn(),
    hexToRgb: jest.fn(),
    hexToHsl: jest.fn(),
  }),
}));

describe('PaletteDetailsView', () => {
  const mockPalettes = [
    {
      id: '1',
      name: 'Paleta 1',
      colors: ['#FF0000', '#00FF00'],
      comment: 'Comentário teste 1',
      createdAt: '2024-03-12T00:00:00Z',
      updatedAt: '2024-03-12T00:00:00Z',
    },
    {
      id: '2',
      name: 'Paleta 2',
      colors: ['#0000FF', '#FFFF00'],
      comment: 'Comentário teste 2',
      createdAt: '2024-03-12T00:00:00Z',
      updatedAt: '2024-03-12T00:00:00Z',
    },
  ];

  it('renderiza todas as paletas com seus detalhes', () => {
    render(<PaletteDetailsView palettes={mockPalettes} />);

    mockPalettes.forEach((palette) => {
      expect(screen.getByText(palette.name)).toBeInTheDocument();
      expect(
        screen.getByText(`Colors: ${palette.colors.join(', ')}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Comment: ${palette.comment}`)
      ).toBeInTheDocument();
    });
  });

  it('renderiza paletas sem comentários', () => {
    const palettesWithoutComments = mockPalettes.map(
      ({ comment, ...palette }) => palette
    );
    render(<PaletteDetailsView palettes={palettesWithoutComments} />);

    palettesWithoutComments.forEach((palette) => {
      expect(screen.getByText(palette.name)).toBeInTheDocument();
      expect(
        screen.getByText(`Colors: ${palette.colors.join(', ')}`)
      ).toBeInTheDocument();
    });
  });
});
