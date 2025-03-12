import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PaletteListItem } from '../PaletteListItem';

// Mock date-fns
jest.mock('date-fns', () => ({
  formatDistanceToNow: jest.fn(() => '2 days ago'),
}));

// Mock PaletteDialog
jest.mock('@organisms/Palettes/PaletteDialog/PaletteDialog', () => ({
  PaletteDialog: ({ open }: { open: boolean }) =>
    open ? <div data-testid="palette-dialog" /> : null,
}));

// Mock DeleteConfirmDialog
jest.mock('@molecules/General/DeleteConfirmDialog/DeleteConfirmDialog', () => ({
  DeleteConfirmDialog: ({ open }: { open: boolean }) =>
    open ? <div data-testid="delete-dialog" /> : null,
}));

// Mock DataProvider
jest.mock('@providers/DataProvider/DataProvider', () => ({
  useData: () => ({
    groups: [{ id: '1', name: 'Test Group' }],
    tags: [{ id: '1', name: 'Test Tag' }],
    palettes: [mockPalette],
    setPalettes: jest.fn(),
  }),
}));

const mockPalette = {
  id: '1',
  name: 'Test Palette',
  colors: ['#FF0000', '#00FF00', '#0000FF'],
  updatedAt: '2024-01-01',
  createdAt: '2024-01-01',
  groupId: '1',
  tagIds: ['1'],
  comment: 'Test comment',
};

const mockProps = {
  palette: mockPalette,
};

describe('PaletteListItem', () => {
  it('renders palette name and colors', () => {
    render(<PaletteListItem {...mockProps} />);

    expect(screen.getByText(mockPalette.name)).toBeInTheDocument();
    mockPalette.colors.forEach((color) => {
      expect(screen.getByTestId(`color-${color}`)).toBeInTheDocument();
    });
  });

  it('renders group and tag', () => {
    render(<PaletteListItem {...mockProps} />);
    expect(screen.getByText('Test Group')).toBeInTheDocument();
    expect(screen.getByText('Test Tag')).toBeInTheDocument();
  });

  it('shows comment icon when comment exists', () => {
    render(<PaletteListItem {...mockProps} />);
    expect(screen.getByTestId('comment-icon')).toBeInTheDocument();
  });

  it('displays updated time', () => {
    render(<PaletteListItem {...mockProps} />);
    expect(screen.getByText('2 days ago')).toBeInTheDocument();
  });

  it('opens edit dialog when edit button is clicked', async () => {
    const user = userEvent.setup();
    render(<PaletteListItem {...mockProps} />);

    const menuButton = screen.getByTestId('menu-button');
    await user.click(menuButton);

    await waitFor(() => {
      expect(
        screen.getByRole('menuitem', { name: /edit/i })
      ).toBeInTheDocument();
    });

    await user.click(screen.getByRole('menuitem', { name: /edit/i }));

    expect(screen.getByTestId('palette-dialog')).toBeInTheDocument();
  });

  it('opens delete dialog when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<PaletteListItem {...mockProps} />);

    const menuButton = screen.getByTestId('menu-button');
    await user.click(menuButton);

    await waitFor(() => {
      expect(
        screen.getByRole('menuitem', { name: /delete/i })
      ).toBeInTheDocument();
    });

    await user.click(screen.getByRole('menuitem', { name: /delete/i }));

    expect(screen.getByTestId('delete-dialog')).toBeInTheDocument();
  });
});
