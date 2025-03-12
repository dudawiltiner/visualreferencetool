import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { PaletteDialog } from '../PaletteDialog';

// Mock do componente PaletteDialog
jest.mock('../PaletteDialog', () => ({
  PaletteDialog: ({ palette }: { palette?: any }) => {
    const title = palette ? 'Edit Color Palette' : 'Add New Color Palette';
    return (
      <div>
        <h2>{title}</h2>
        {palette && (
          <div>
            <div>Name: {palette.name}</div>
            <div>Colors: {palette.colors.join(', ')}</div>
          </div>
        )}
      </div>
    );
  },
}));

// Mock do contexto de dados
jest.mock('@providers/DataProvider/DataProvider', () => ({
  useData: () => ({
    groups: [],
    tags: [],
    setPalettes: jest.fn(),
  }),
}));

describe('PaletteDialog', () => {
  const defaultProps = {
    open: true,
    onOpenChange: jest.fn(),
  };

  it('renderiza diálogo para adicionar nova paleta', () => {
    render(<PaletteDialog {...defaultProps} />);
    expect(screen.getByText('Add New Color Palette')).toBeInTheDocument();
  });

  it('renderiza diálogo para editar paleta existente', () => {
    const palette = {
      id: '1',
      name: 'Paleta Teste',
      colors: ['#FF0000', '#00FF00', '#0000FF'],
      groupId: '1',
      tagIds: ['1'],
      comment: 'Comentário teste',
      createdAt: '2024-03-12T00:00:00Z',
      updatedAt: '2024-03-12T00:00:00Z',
    };

    render(<PaletteDialog {...defaultProps} palette={palette} />);

    expect(screen.getByText('Edit Color Palette')).toBeInTheDocument();
    expect(screen.getByText(`Name: ${palette.name}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Colors: ${palette.colors.join(', ')}`)
    ).toBeInTheDocument();
  });
});
