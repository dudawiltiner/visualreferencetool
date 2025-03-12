import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SelectablePaletteListItem } from '../SelectablePaletteListItem';

// Mock PaletteListItem
jest.mock('@molecules/Palettes/PaletteListItem/PaletteListItem', () => ({
  PaletteListItem: () => (
    <div data-testid="palette-list-item">Mocked PaletteListItem</div>
  ),
}));

describe('SelectablePaletteListItem', () => {
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

  it('renders PaletteListItem component', () => {
    render(<SelectablePaletteListItem {...mockProps} />);
    expect(screen.getByTestId('palette-list-item')).toBeInTheDocument();
  });

  it('renders checkbox when in selection mode', () => {
    render(<SelectablePaletteListItem {...mockProps} selectionMode={true} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('shows checkbox as checked when selected', () => {
    render(
      <SelectablePaletteListItem
        {...mockProps}
        selectionMode={true}
        isSelected={true}
      />
    );
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls onSelect when checkbox is clicked', async () => {
    const user = userEvent.setup();
    render(<SelectablePaletteListItem {...mockProps} selectionMode={true} />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(mockProps.onSelect).toHaveBeenCalledWith(mockPalette.id, true);
  });

  it('calls onSelect when item is clicked in selection mode', async () => {
    const user = userEvent.setup();
    render(<SelectablePaletteListItem {...mockProps} selectionMode={true} />);

    const item = screen.getByTestId('selectable-list-item');
    await user.click(item);

    expect(mockProps.onSelect).toHaveBeenCalledWith(mockPalette.id, true);
  });

  it('does not call onSelect when item is clicked outside selection mode', async () => {
    const user = userEvent.setup();
    render(<SelectablePaletteListItem {...mockProps} />);

    const item = screen.getByTestId('selectable-list-item');
    await user.click(item);

    expect(mockProps.onSelect).not.toHaveBeenCalled();
  });
});
