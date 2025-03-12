import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { MultiSelect } from '../MultiSelect';
import { MultiSelectOption } from '../MultiSelect.types';

const mockOptions: MultiSelectOption[] = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
];

const mockProps = {
  options: mockOptions,
  selected: ['opt1'],
  onChange: jest.fn(),
  placeholder: 'Select items...',
};

describe('MultiSelect', () => {
  it('renders with selected items', () => {
    render(<MultiSelect {...mockProps} />);
    const input = screen.getByRole('combobox');
    expect(input).toBeInTheDocument();
  });
});
