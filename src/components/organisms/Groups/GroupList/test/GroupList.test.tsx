import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { GroupList } from '../GroupList';

const mockGroups = [
  {
    id: '1',
    name: 'Group 1',
    description: 'Description 1',
    createdAt: '2024-03-12T00:00:00Z',
    updatedAt: '2024-03-12T00:00:00Z',
  },
  {
    id: '2',
    name: 'Group 2',
    description: 'Description 2',
    createdAt: '2024-03-12T00:00:00Z',
    updatedAt: '2024-03-12T00:00:00Z',
  },
];

// Mock useData hook
const mockSetGroups = jest.fn();
const mockSetImages = jest.fn();
const mockSetPalettes = jest.fn();

jest.mock('@providers/DataProvider/DataProvider', () => ({
  useData: jest.fn(() => ({
    groups: mockGroups,
    setGroups: mockSetGroups,
    images: [],
    setImages: mockSetImages,
    palettes: [],
    setPalettes: mockSetPalettes,
  })),
}));

// Mock useToast hook
const mockToast = jest.fn();
jest.mock('@hooks/General/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}));

// Mock GroupDialog
jest.mock('../../../Groups/GroupDialog/GroupDialog', () => ({
  GroupDialog: ({ open, onOpenChange, group }: any) => (
    <div data-testid="group-dialog">
      <span>Group Dialog</span>
      <span>{group?.name}</span>
      <button onClick={() => onOpenChange(false)}>Close</button>
    </div>
  ),
}));

// Mock DeleteConfirmDialog
jest.mock('@molecules/General/DeleteConfirmDialog/DeleteConfirmDialog', () => ({
  DeleteConfirmDialog: ({ open, onOpenChange, onConfirm }: any) => (
    <div data-testid="delete-dialog">
      <span>Delete Dialog</span>
      <button onClick={() => onConfirm()}>Confirm</button>
      <button onClick={() => onOpenChange(false)}>Cancel</button>
    </div>
  ),
}));

describe('GroupList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza a mensagem quando não há grupos', () => {
    const useData = require('@providers/DataProvider/DataProvider').useData;
    useData.mockReturnValue({
      groups: [],
      setGroups: mockSetGroups,
      images: [],
      setImages: mockSetImages,
      palettes: [],
      setPalettes: mockSetPalettes,
    });

    render(<GroupList />);
    expect(screen.getByText('No groups created yet')).toBeInTheDocument();
  });

  it('renderiza a lista de grupos', () => {
    const useData = require('@providers/DataProvider/DataProvider').useData;
    useData.mockReturnValue({
      groups: mockGroups,
      setGroups: mockSetGroups,
      images: [],
      setImages: mockSetImages,
      palettes: [],
      setPalettes: mockSetPalettes,
    });

    render(<GroupList />);

    mockGroups.forEach((group) => {
      expect(screen.getByText(group.name)).toBeInTheDocument();
      expect(screen.getByText(group.description)).toBeInTheDocument();
    });
  });

  it('abre o diálogo de edição ao clicar no botão de editar', () => {
    const useData = require('@providers/DataProvider/DataProvider').useData;
    useData.mockReturnValue({
      groups: mockGroups,
      setGroups: mockSetGroups,
      images: [],
      setImages: mockSetImages,
      palettes: [],
      setPalettes: mockSetPalettes,
    });

    render(<GroupList />);

    const editButton = screen.getByTestId('edit-button-1');
    fireEvent.click(editButton);

    expect(screen.getByTestId('group-dialog')).toBeInTheDocument();
    expect(screen.getByTestId('group-dialog').textContent).toContain('Group 1');
  });

  it('abre o diálogo de confirmação ao clicar no botão de deletar', () => {
    const useData = require('@providers/DataProvider/DataProvider').useData;
    useData.mockReturnValue({
      groups: mockGroups,
      setGroups: mockSetGroups,
      images: [],
      setImages: mockSetImages,
      palettes: [],
      setPalettes: mockSetPalettes,
    });

    render(<GroupList />);

    const deleteButton = screen.getByTestId('delete-button-1');
    fireEvent.click(deleteButton);

    expect(screen.getByTestId('delete-dialog')).toBeInTheDocument();
  });

  it('chama as funções corretas ao confirmar a exclusão', () => {
    const useData = require('@providers/DataProvider/DataProvider').useData;
    useData.mockReturnValue({
      groups: mockGroups,
      setGroups: mockSetGroups,
      images: [],
      setImages: mockSetImages,
      palettes: [],
      setPalettes: mockSetPalettes,
    });

    render(<GroupList />);

    const deleteButton = screen.getByTestId('delete-button-1');
    fireEvent.click(deleteButton);

    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    fireEvent.click(confirmButton);

    expect(mockSetGroups).toHaveBeenCalledWith([mockGroups[1]]);
    expect(mockSetImages).toHaveBeenCalled();
    expect(mockSetPalettes).toHaveBeenCalled();
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Group deleted',
      description: 'The group has been removed',
    });
  });
});
