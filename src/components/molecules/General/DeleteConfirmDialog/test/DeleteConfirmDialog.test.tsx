import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { DeleteConfirmDialog } from '../DeleteConfirmDialog';

const mockProps = {
  open: true,
  onOpenChange: jest.fn(),
  onConfirm: jest.fn(),
  title: 'Delete Item',
  description: 'Are you sure you want to delete this item?',
};

describe('DeleteConfirmDialog', () => {
  it('renders dialog content when open', () => {
    render(<DeleteConfirmDialog {...mockProps} />);
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  });
});
