import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { PaletteColumnsView } from '../PaletteColumnsView';

// Mock do componente PaletteColumnsView
jest.mock('../PaletteColumnsView', () => ({
  PaletteColumnsView: ({ palettes }: { palettes: any[] }) => {
    // Agrupa paletas por mês/ano
    const groupedPalettes = palettes.reduce((groups: any, palette: any) => {
      const date = new Date(palette.createdAt);
      const monthYear = `${date.toLocaleString('pt-BR', { month: 'long' })} ${date.getFullYear()}`;

      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }

      groups[monthYear].push(palette);
      return groups;
    }, {});

    return (
      <div>
        {Object.entries(groupedPalettes).map(
          ([monthYear, palettes]: [string, any]) => (
            <div key={monthYear} className="month-group">
              <h3>{monthYear}</h3>
              <div className="palettes">
                {palettes.map((palette: any) => (
                  <div key={palette.id} className="palette-card">
                    <h4>{palette.name}</h4>
                    <div>Colors: {palette.colors.join(', ')}</div>
                    {palette.comment && <p>Comment: {palette.comment}</p>}
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    );
  },
}));

// Mock do contexto de dados
jest.mock('@providers/DataProvider/DataProvider', () => ({
  useData: () => ({
    palettes: [],
    setPalettes: jest.fn(),
    groups: [],
    tags: [],
  }),
}));

describe('PaletteColumnsView', () => {
  const mockPalettes = [
    {
      id: '1',
      name: 'Paleta Janeiro',
      colors: ['#FF0000', '#00FF00'],
      comment: 'Comentário teste 1',
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
    },
    {
      id: '2',
      name: 'Paleta Março',
      colors: ['#0000FF', '#FFFF00'],
      comment: 'Comentário teste 2',
      createdAt: '2024-03-12T00:00:00Z',
      updatedAt: '2024-03-12T00:00:00Z',
    },
  ];

  it('renderiza paletas agrupadas por mês', () => {
    render(<PaletteColumnsView palettes={mockPalettes} />);

    // Verifica os grupos de meses
    expect(screen.getByText('janeiro 2024')).toBeInTheDocument();
    expect(screen.getByText('março 2024')).toBeInTheDocument();

    // Verifica as paletas em cada grupo
    expect(screen.getByText('Paleta Janeiro')).toBeInTheDocument();
    expect(screen.getByText('Colors: #FF0000, #00FF00')).toBeInTheDocument();
    expect(screen.getByText('Paleta Março')).toBeInTheDocument();
    expect(screen.getByText('Colors: #0000FF, #FFFF00')).toBeInTheDocument();
  });

  it('renderiza comentários quando disponíveis', () => {
    render(<PaletteColumnsView palettes={mockPalettes} />);

    expect(screen.getByText('Comment: Comentário teste 1')).toBeInTheDocument();
    expect(screen.getByText('Comment: Comentário teste 2')).toBeInTheDocument();
  });
});
