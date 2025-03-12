import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SelectablePaletteCard } from '../SelectablePaletteCard';

// Mock PaletteCard
jest.mock('@molecules/Palettes/PaletteCard/PaletteCard', () => ({
  PaletteCard: () => <div data-testid="palette-card">Mocked PaletteCard</div>,
}));

describe('SelectablePaletteCard', () => {
  const mockPalette = {
    id: '1',
    name: 'Test Palette',
    colors: ['#FF0000', '#00FF00', '#0000FF'],
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };

  const mockProps = {
    palette: mockPalette,
    isSelected: false,
    selectionMode: false,
    onSelect: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders PaletteCard component', () => {
    render(<SelectablePaletteCard {...mockProps} />);
    expect(screen.getByTestId('palette-card')).toBeInTheDocument();
  });

  it('renders checkbox when in selection mode', () => {
    render(<SelectablePaletteCard {...mockProps} selectionMode={true} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('shows checkbox as checked when selected', () => {
    render(
      <SelectablePaletteCard
        {...mockProps}
        selectionMode={true}
        isSelected={true}
      />
    );
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls onSelect when checkbox is clicked', async () => {
    const user = userEvent.setup();
    render(<SelectablePaletteCard {...mockProps} selectionMode={true} />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(mockProps.onSelect).toHaveBeenCalledWith(mockPalette.id, true);
  });

  it('calls onSelect when card is clicked in selection mode', async () => {
    const user = userEvent.setup();
    render(<SelectablePaletteCard {...mockProps} selectionMode={true} />);

    const card = screen.getByTestId('selectable-card');
    await user.click(card);

    expect(mockProps.onSelect).toHaveBeenCalledWith(mockPalette.id, true);
  });

  it('does not call onSelect when card is clicked outside selection mode', async () => {
    const user = userEvent.setup();
    render(<SelectablePaletteCard {...mockProps} />);

    const card = screen.getByTestId('selectable-card');
    await user.click(card);

    expect(mockProps.onSelect).not.toHaveBeenCalled();
  });
});
