import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { AdvancedColorPicker } from '../AdvancedColorPicker';

// Mock dos componentes filhos
jest.mock('../../ColorPickers/ColorPickers', () => ({
  ColorPickers: () => <div data-testid="color-pickers">Color Pickers</div>,
}));

jest.mock('../../RecentColors/RecentColors', () => ({
  RecentColors: () => <div data-testid="recent-colors">Recent Colors</div>,
}));

// Mock do @uiw/color-convert
jest.mock('@uiw/color-convert', () => ({
  hexToRgba: () => ({ r: 255, g: 0, b: 0, a: 1 }),
  rgbaToHsva: () => ({ h: 0, s: 100, v: 100, a: 1 }),
  hsvaToHex: () => '#FF0000',
}));

const mockProps = {
  color: '#FF0000',
  currentColor: '#FF0000',
  onChange: jest.fn(),
};

describe('AdvancedColorPicker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with initial color', () => {
    render(<AdvancedColorPicker {...mockProps} />);
    const button = screen.getByRole('button', { name: /pick a color/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle({ backgroundColor: '#FF0000' });
  });

  it('opens color picker dialog when clicked', () => {
    render(<AdvancedColorPicker {...mockProps} />);
    const button = screen.getByRole('button', { name: /pick a color/i });
    fireEvent.click(button);
    expect(screen.getByTestId('color-pickers')).toBeInTheDocument();
  });
});
