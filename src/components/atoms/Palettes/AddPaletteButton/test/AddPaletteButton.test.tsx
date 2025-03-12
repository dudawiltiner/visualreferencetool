import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AddPaletteButton } from '../AddPaletteButton';

jest.mock('@organisms/Palettes/PaletteDialog/PaletteDialog', () => ({
  PaletteDialog: ({
    open,
    onOpenChange,
  }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }) =>
    open ? (
      <div role="dialog" onClick={() => onOpenChange(false)}>
        Palette Dialog
      </div>
    ) : null,
}));

describe('AddPaletteButton', () => {
  it('renders correctly', () => {
    const mockOnClick = jest.fn();
    render(<AddPaletteButton onClick={mockOnClick} />);

    expect(screen.getByTestId('add-palette-button')).toBeInTheDocument();
    expect(screen.getByText('Add Palette')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    render(<AddPaletteButton onClick={mockOnClick} />);

    await user.click(screen.getByTestId('add-palette-button'));

    expect(mockOnClick).toHaveBeenCalled();
  });

  it('opens and closes dialog correctly', async () => {
    const user = userEvent.setup();
    render(<AddPaletteButton onClick={() => {}} />);

    // Inicialmente o diálogo não deve estar visível
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Abre o diálogo
    await user.click(screen.getByTestId('add-palette-button'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Fecha o diálogo
    await user.click(screen.getByRole('dialog'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
