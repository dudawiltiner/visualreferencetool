import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AddTagButton } from '../AddTagButton';

jest.mock('@molecules/Tags/TagDialog/TagDialog', () => ({
  TagDialog: ({
    open,
    onOpenChange,
  }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }) =>
    open ? (
      <div role="dialog" onClick={() => onOpenChange(false)}>
        Tag Dialog
      </div>
    ) : null,
}));

describe('AddTagButton', () => {
  it('renders correctly', () => {
    render(<AddTagButton />);

    const button = screen.getByRole('button', { name: /add tag/i });
    expect(button).toBeInTheDocument();
  });

  it('opens and closes dialog correctly', async () => {
    const user = userEvent.setup();
    render(<AddTagButton />);

    // Inicialmente o diálogo não deve estar visível
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Abre o diálogo
    await user.click(screen.getByRole('button', { name: /add tag/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Fecha o diálogo
    await user.click(screen.getByRole('dialog'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
