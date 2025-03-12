import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { ColorPickers } from '../ColorPickers';

// Mock do react-colorful
jest.mock('react-colorful', () => ({
  HexColorPicker: () => <div data-testid="hex-picker">Hex Picker</div>,
  RgbColorPicker: () => <div data-testid="rgb-picker">RGB Picker</div>,
  HslColorPicker: () => <div data-testid="hsl-picker">HSL Picker</div>,
}));

// Mock do @uiw/react-color
jest.mock('@uiw/react-color', () => ({
  Sketch: () => <div data-testid="sketch-picker">Sketch Picker</div>,
  Chrome: () => <div data-testid="chrome-picker">Chrome Picker</div>,
  Wheel: () => <div data-testid="wheel-picker">Wheel Picker</div>,
  Material: () => <div data-testid="material-picker">Material Picker</div>,
  Compact: () => <div data-testid="compact-picker">Compact Picker</div>,
  Circle: () => <div data-testid="circle-picker">Circle Picker</div>,
}));

const mockProps = {
  pickerType: 'hex',
  setPickerType: jest.fn(),
  currentColor: '#FF0000',
  hexToHsva: jest.fn(),
  onChange: jest.fn(),
};

describe('ColorPickers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default picker type', () => {
    render(<ColorPickers {...mockProps} />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByTestId('hex-picker')).toBeInTheDocument();
  });
});
