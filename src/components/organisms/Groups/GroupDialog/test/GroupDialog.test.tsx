import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { GroupDialog } from '../GroupDialog';

// Mock useData hook
jest.mock('@providers/DataProvider/DataProvider', () => ({
  useData: () => ({
    groups: [],
    setGroups: jest.fn(),
  }),
}));

// Mock useToast hook
jest.mock('@hooks/General/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

describe('GroupDialog', () => {
  const defaultProps = {
    open: true,
    onOpenChange: jest.fn(),
  };

  it('renderiza o diálogo para adicionar um novo grupo', () => {
    render(<GroupDialog {...defaultProps} />);

    expect(screen.getByText('Add New Group')).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /add group/i })
    ).toBeInTheDocument();
  });

  it('renderiza o diálogo para editar um grupo existente', () => {
    const group = {
      id: '1',
      name: 'Test Group',
      description: 'Test Description',
      createdAt: '2024-03-12T00:00:00Z',
      updatedAt: '2024-03-12T00:00:00Z',
    };

    render(<GroupDialog {...defaultProps} group={group} />);

    expect(screen.getByText('Edit Group')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Group')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /save changes/i })
    ).toBeInTheDocument();
  });

  it('manipula mudanças nos campos do formulário', () => {
    render(<GroupDialog {...defaultProps} />);

    const nameInput = screen.getByLabelText(/name/i);
    const descriptionInput = screen.getByLabelText(/description/i);

    fireEvent.change(nameInput, { target: { value: 'New Group' } });
    fireEvent.change(descriptionInput, {
      target: { value: 'New Description' },
    });

    expect(nameInput).toHaveValue('New Group');
    expect(descriptionInput).toHaveValue('New Description');
  });

  it('não permite submissão sem nome do grupo', () => {
    const mockToast = jest.fn();
    jest
      .spyOn(require('@hooks/General/use-toast'), 'useToast')
      .mockReturnValue({
        toast: mockToast,
      });

    render(<GroupDialog {...defaultProps} />);

    const submitButton = screen.getByRole('button', { name: /add group/i });
    fireEvent.click(submitButton);

    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Missing information',
        description: 'Please provide a name for the group',
        variant: 'destructive',
      })
    );
  });
});
