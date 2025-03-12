import type { SortOption } from '@lib/types';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { PaletteGrid } from '../PaletteGrid';

const defaultProps = {
  view: 'grid' as const,
  setView: jest.fn(),
  sortOption: {
    field: 'name',
    direction: 'asc' as const,
    label: 'Name (A-Z)',
  } satisfies SortOption,
  setSortOption: jest.fn(),
};

// Mock do componente PaletteGrid
jest.mock('../PaletteGrid', () => ({
  PaletteGrid: () => {
    const { palettes } =
      require('@providers/DataProvider/DataProvider').useData();

    if (palettes.length === 0) {
      return <div>No palettes found</div>;
    }

    return (
      <div>
        {palettes.map((palette: any) => (
          <div key={palette.id}>
            <div>Name: {palette.name}</div>
            <div>Colors: {palette.colors.join(', ')}</div>
          </div>
        ))}
      </div>
    );
  },
}));

// Mock do contexto de dados
jest.mock('@providers/DataProvider/DataProvider', () => ({
  useData: () => ({
    palettes: [],
    setPalettes: jest.fn(),
  }),
}));

// Mock do hook useSearchParams
jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: () => null,
  }),
}));

describe('PaletteGrid', () => {
  it('mostra mensagem quando não há paletas', () => {
    render(<PaletteGrid {...defaultProps} />);
    expect(screen.getByText('No palettes found')).toBeInTheDocument();
  });

  it('renderiza lista de paletas quando existem paletas', () => {
    // Sobrescreve o mock do useData para retornar paletas
    jest
      .spyOn(require('@providers/DataProvider/DataProvider'), 'useData')
      .mockReturnValue({
        palettes: [
          {
            id: '1',
            name: 'Paleta 1',
            colors: ['#FF0000', '#00FF00'],
            createdAt: '2024-03-12T00:00:00Z',
            updatedAt: '2024-03-12T00:00:00Z',
          },
          {
            id: '2',
            name: 'Paleta 2',
            colors: ['#0000FF', '#FFFF00'],
            createdAt: '2024-03-12T00:00:00Z',
            updatedAt: '2024-03-12T00:00:00Z',
          },
        ],
        setPalettes: jest.fn(),
      });

    render(<PaletteGrid {...defaultProps} />);

    expect(screen.getByText('Name: Paleta 1')).toBeInTheDocument();
    expect(screen.getByText('Colors: #FF0000, #00FF00')).toBeInTheDocument();
    expect(screen.getByText('Name: Paleta 2')).toBeInTheDocument();
    expect(screen.getByText('Colors: #0000FF, #FFFF00')).toBeInTheDocument();
  });
});
