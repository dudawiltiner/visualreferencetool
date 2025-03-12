import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { AdvancedColorEditor } from '../AdvancedColorEditor';

// Mock dos componentes do react-color
jest.mock('@uiw/react-color', () => ({
  Sketch: () => <div data-testid="sketch-picker">Sketch Picker</div>,
  Colorful: () => <div data-testid="colorful-picker">Colorful Picker</div>,
}));

describe('AdvancedColorEditor', () => {
  const mockProps = {
    color: '#FF0000',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with initial color', () => {
    render(<AdvancedColorEditor {...mockProps} />);
    expect(screen.getByText('#FF0000')).toBeInTheDocument();
    expect(screen.getByText('rgb(255, 0, 0)')).toBeInTheDocument();
  });

  it('shows color pickers based on selected tab', () => {
    render(<AdvancedColorEditor {...mockProps} />);
    expect(screen.getByTestId('sketch-picker')).toBeInTheDocument();
  });

  it('updates color when hex input changes', () => {
    render(<AdvancedColorEditor {...mockProps} />);
    const hexInput = screen.getByDisplayValue('#FF0000');
    fireEvent.change(hexInput, { target: { value: '#00FF00' } });
    expect(mockProps.onChange).toHaveBeenCalledWith('#00FF00');
  });

  it('validates hex input format', () => {
    render(<AdvancedColorEditor {...mockProps} />);
    const hexInput = screen.getByDisplayValue('#FF0000');
    fireEvent.change(hexInput, { target: { value: 'invalid' } });
    expect(mockProps.onChange).not.toHaveBeenCalled();
  });

  it('updates when color prop changes', () => {
    const { rerender } = render(<AdvancedColorEditor {...mockProps} />);
    rerender(<AdvancedColorEditor {...mockProps} color="#00FF00" />);
    expect(screen.getByText('#00FF00')).toBeInTheDocument();
  });
});
