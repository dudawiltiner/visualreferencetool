import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PaletteViewSwitcher } from '../PaletteViewSwitcher';

describe('PaletteViewSwitcher', () => {
  const mockOnViewChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders view options', () => {
    render(<PaletteViewSwitcher view="grid" onViewChange={mockOnViewChange} />);

    expect(screen.getByRole('button', { name: 'grid' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'list' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'columns' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'details' })).toBeInTheDocument();
  });

  it('calls onViewChange when view is switched', async () => {
    const user = userEvent.setup();
    render(<PaletteViewSwitcher view="grid" onViewChange={mockOnViewChange} />);

    const listViewButton = screen.getByRole('button', { name: 'list' });
    await user.click(listViewButton);

    expect(mockOnViewChange).toHaveBeenCalledWith('list');
  });

  it('highlights the current view button', () => {
    render(<PaletteViewSwitcher view="grid" onViewChange={mockOnViewChange} />);

    expect(screen.getByRole('button', { name: 'grid' })).toHaveClass(
      'bg-secondary'
    );
    expect(screen.getByRole('button', { name: 'list' })).not.toHaveClass(
      'bg-secondary'
    );
  });

  it('deve destacar o botão correto quando a visualização é alterada', () => {
    render(<PaletteViewSwitcher view="list" onViewChange={mockOnViewChange} />);

    expect(screen.getByRole('button', { name: 'grid' })).not.toHaveClass(
      'bg-secondary'
    );
    expect(screen.getByRole('button', { name: 'list' })).toHaveClass(
      'bg-secondary'
    );
  });
});
