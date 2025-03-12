import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PaletteHeader } from '../PaletteHeader';

// Mock the DataProvider
jest.mock('@providers/DataProvider/DataProvider', () => ({
  useData: () => ({
    palettes: [],
    selectedPaletteIds: [],
    setSelectedPaletteIds: jest.fn(),
  }),
}));

describe('PaletteHeader', () => {
  const mockPalette = {
    id: '1',
    name: 'Test Palette',
    colors: ['#FF0000'],
    tagIds: ['1'],
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };

  const mockGroup = {
    id: '1',
    name: 'Test Group',
    description: 'Test Description',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockTags = [
    {
      id: '1',
      name: 'Test Tag',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const mockProps = {
    palette: mockPalette,
    group: mockGroup,
    tags: mockTags,
    onEdit: jest.fn(),
    onDelete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders palette name and group', () => {
    render(<PaletteHeader {...mockProps} />);

    expect(screen.getByText('Test Palette')).toBeInTheDocument();
    expect(screen.getByText('Test Group')).toBeInTheDocument();
  });

  it('renders edit and delete buttons', () => {
    render(<PaletteHeader {...mockProps} />);

    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('renders tags', () => {
    render(<PaletteHeader {...mockProps} />);

    expect(screen.getByText('Test Tag')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', async () => {
    const user = userEvent.setup();
    render(<PaletteHeader {...mockProps} />);

    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);

    expect(mockProps.onEdit).toHaveBeenCalled();
  });

  it('calls onDelete when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<PaletteHeader {...mockProps} />);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    expect(mockProps.onDelete).toHaveBeenCalled();
  });

  it('renders without group', () => {
    render(<PaletteHeader {...mockProps} group={undefined} />);

    expect(screen.getByText('Test Palette')).toBeInTheDocument();
    expect(screen.queryByText('Test Group')).not.toBeInTheDocument();
  });

  it('renders without tags', () => {
    render(<PaletteHeader {...mockProps} tags={[]} />);

    expect(screen.queryByText('Test Tag')).not.toBeInTheDocument();
  });
});
