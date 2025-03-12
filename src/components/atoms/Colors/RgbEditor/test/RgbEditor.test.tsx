import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { RgbEditor } from '../RgbEditor';

describe('RgbEditor', () => {
  const mockOnChange = jest.fn();
  const initialRgb = { r: 255, g: 0, b: 0 };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders correctly', () => {
    render(<RgbEditor rgb={initialRgb} onChange={mockOnChange} />);
    expect(screen.getByTestId('red-input')).toBeInTheDocument();
    expect(screen.getByTestId('green-input')).toBeInTheDocument();
    expect(screen.getByTestId('blue-input')).toBeInTheDocument();
  });

  it('updates color when red changes', () => {
    render(<RgbEditor rgb={initialRgb} onChange={mockOnChange} />);

    const redInput = screen.getByTestId('red-input');
    fireEvent.change(redInput, { target: { value: '128' } });

    expect(mockOnChange).toHaveBeenCalledWith('r', 128);
  });

  it('updates color when green changes', () => {
    render(<RgbEditor rgb={initialRgb} onChange={mockOnChange} />);

    const greenInput = screen.getByTestId('green-input');
    fireEvent.change(greenInput, { target: { value: '128' } });

    expect(mockOnChange).toHaveBeenCalledWith('g', 128);
  });

  it('updates color when blue changes', () => {
    render(<RgbEditor rgb={initialRgb} onChange={mockOnChange} />);

    const blueInput = screen.getByTestId('blue-input');
    fireEvent.change(blueInput, { target: { value: '128' } });

    expect(mockOnChange).toHaveBeenCalledWith('b', 128);
  });
});
