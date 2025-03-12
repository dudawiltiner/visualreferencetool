import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AddGroupButton } from '../AddGroupButton';

jest.mock('@organisms/Groups/GroupDialog/GroupDialog', () => ({
  GroupDialog: ({
    open,
    onOpenChange,
  }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }) =>
    open ? (
      <div role="dialog" onClick={() => onOpenChange(false)}>
        Group Dialog
      </div>
    ) : null,
}));

describe('AddGroupButton', () => {
  it('renders correctly', () => {
    render(<AddGroupButton />);
    expect(
      screen.getByRole('button', { name: /add group/i })
    ).toBeInTheDocument();
  });

  it('opens dialog when clicked', async () => {
    const user = userEvent.setup();
    render(<AddGroupButton />);

    await user.click(screen.getByRole('button', { name: /add group/i }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes dialog when onOpenChange is called', async () => {
    const user = userEvent.setup();
    render(<AddGroupButton />);

    // Abre o diálogo
    await user.click(screen.getByRole('button', { name: /add group/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Fecha o diálogo
    await user.click(screen.getByRole('dialog'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
