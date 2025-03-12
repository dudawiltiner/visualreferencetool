import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { HslEditor } from '../HslEditor';

describe('HslEditor', () => {
  const mockOnChange = jest.fn();
  const initialHsl = { h: 0, s: 100, l: 50 };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders correctly', () => {
    render(<HslEditor hsl={initialHsl} onChange={mockOnChange} />);
    expect(screen.getByTestId('hue-input')).toBeInTheDocument();
    expect(screen.getByTestId('saturation-input')).toBeInTheDocument();
    expect(screen.getByTestId('lightness-input')).toBeInTheDocument();
  });

  it('updates color when hue changes', () => {
    render(<HslEditor hsl={initialHsl} onChange={mockOnChange} />);

    const hueInput = screen.getByTestId('hue-input');
    fireEvent.change(hueInput, { target: { value: '180' } });

    expect(mockOnChange).toHaveBeenCalledWith('h', 180);
  });

  it('updates color when saturation changes', () => {
    render(<HslEditor hsl={initialHsl} onChange={mockOnChange} />);

    const saturationInput = screen.getByTestId('saturation-input');
    fireEvent.change(saturationInput, { target: { value: '50' } });

    expect(mockOnChange).toHaveBeenCalledWith('s', 50);
  });

  it('updates color when lightness changes', () => {
    render(<HslEditor hsl={initialHsl} onChange={mockOnChange} />);

    const lightnessInput = screen.getByTestId('lightness-input');
    fireEvent.change(lightnessInput, { target: { value: '75' } });

    expect(mockOnChange).toHaveBeenCalledWith('l', 75);
  });
});
