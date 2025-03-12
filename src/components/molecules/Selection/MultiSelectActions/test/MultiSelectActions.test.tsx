import { useToast } from '@hooks/General/use-toast';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MultiSelectActions } from '../MultiSelectActions';

// Mock do useToast
jest.mock('@hooks/General/use-toast', () => ({
  useToast: jest.fn(),
}));

describe('MultiSelectActions', () => {
  const mockItems = ['1', '2', '3'];
  const mockSelectedItems: string[] = [];

  const mockProps = {
    items: mockItems,
    selectedItems: mockSelectedItems,
    onSelectAll: jest.fn(),
    onDeleteSelected: jest.fn(),
    onSelectItem: jest.fn(),
    type: 'images' as const,
  };

  const mockToast = jest.fn();

  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue({
      toast: mockToast,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza checkbox de selecionar todos', () => {
    render(<MultiSelectActions {...mockProps} />);

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText('Select All')).toBeInTheDocument();
  });

  it('mostra "Deselect All" quando todos os itens estão selecionados', () => {
    render(
      <MultiSelectActions {...mockProps} selectedItems={[...mockItems]} />
    );

    expect(screen.getByText('Deselect All')).toBeInTheDocument();
  });

  it('mostra quantidade de itens selecionados', () => {
    render(
      <MultiSelectActions
        {...mockProps}
        selectedItems={[mockItems[0], mockItems[1]]}
      />
    );

    expect(screen.getByText('2 selected')).toBeInTheDocument();
  });

  it('chama onSelectAll quando o checkbox é clicado', async () => {
    const user = userEvent.setup();
    render(<MultiSelectActions {...mockProps} />);

    await user.click(screen.getByRole('checkbox'));

    expect(mockProps.onSelectAll).toHaveBeenCalledWith(true);
  });

  it('mostra diálogo de confirmação ao clicar em deletar', async () => {
    const user = userEvent.setup();
    render(
      <MultiSelectActions
        {...mockProps}
        selectedItems={[mockItems[0], mockItems[1]]}
      />
    );

    await user.click(screen.getByText('Actions'));
    await user.click(screen.getByText('Delete Selected'));

    expect(screen.getByText('Delete 2 images?')).toBeInTheDocument();
  });

  it('chama onDeleteSelected e mostra toast ao confirmar deleção', async () => {
    const user = userEvent.setup();
    const selectedItems = [mockItems[0], mockItems[1]];
    render(<MultiSelectActions {...mockProps} selectedItems={selectedItems} />);

    await user.click(screen.getByText('Actions'));
    await user.click(screen.getByText('Delete Selected'));
    await user.click(screen.getByRole('button', { name: 'Delete' }));

    expect(mockProps.onDeleteSelected).toHaveBeenCalledWith(selectedItems);
    expect(mockToast).toHaveBeenCalledWith({
      title: '2 images deleted',
      description: 'The selected images have been removed from your collection',
    });
  });

  it('mostra opções adicionais para imagens e paletas', async () => {
    const user = userEvent.setup();
    render(
      <MultiSelectActions
        {...mockProps}
        selectedItems={[mockItems[0]]}
        type="images"
      />
    );

    await user.click(screen.getByText('Actions'));

    expect(screen.getByText('Add to Group')).toBeInTheDocument();
    expect(screen.getByText('Add Tags')).toBeInTheDocument();
  });

  it('não mostra opções adicionais para grupos e tags', async () => {
    const user = userEvent.setup();
    render(
      <MultiSelectActions
        {...mockProps}
        selectedItems={[mockItems[0]]}
        type="groups"
      />
    );

    await user.click(screen.getByText('Actions'));

    expect(screen.queryByText('Add to Group')).not.toBeInTheDocument();
    expect(screen.queryByText('Add Tags')).not.toBeInTheDocument();
  });
});
