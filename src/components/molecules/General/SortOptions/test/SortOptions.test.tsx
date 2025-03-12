import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { SortOptions } from '../SortOptions';
import { SortOption } from '../SortOptions.types';

const mockOptions: SortOption[] = [
  { field: 'name', direction: 'asc', label: 'Name (A-Z)' },
  { field: 'name', direction: 'desc', label: 'Name (Z-A)' },
];

const mockProps = {
  options: mockOptions,
  currentSort: mockOptions[0],
  onSortChange: jest.fn(),
};

describe('SortOptions', () => {
  it('renders with initial sort option', () => {
    render(<SortOptions {...mockProps} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
