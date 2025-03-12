import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ColorEditor } from '../ColorEditor';

describe('ColorEditor', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders correctly', () => {
    render(<ColorEditor color="#FF0000" onChange={mockOnChange} />);
    expect(screen.getByText('RGB')).toBeInTheDocument();
    expect(screen.getByText('HSL')).toBeInTheDocument();
    expect(screen.getByText('HEX')).toBeInTheDocument();
  });

  it('switches between color modes', async () => {
    const user = userEvent.setup();
    render(<ColorEditor color="#FF0000" onChange={mockOnChange} />);

    // Muda para modo RGB
    await user.click(screen.getByText(/rgb/i));
    expect(screen.getByText(/red/i)).toBeInTheDocument();

    // Muda para modo HSL
    await user.click(screen.getByText(/hsl/i));
    expect(screen.getByText(/hue/i)).toBeInTheDocument();
  });
});
