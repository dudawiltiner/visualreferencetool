import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RecentColors } from '../RecentColors';

describe('RecentColors', () => {
  const mockRecentColors = ['#FF0000', '#00FF00', '#0000FF'];
  const mockCurrentColor = '#FF0000';
  const mockOnColorSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with recent colors', () => {
    render(
      <RecentColors
        recentColors={mockRecentColors}
        currentColor={mockCurrentColor}
        onColorSelect={mockOnColorSelect}
      />
    );

    expect(screen.getByText('Recent Colors')).toBeInTheDocument();
    mockRecentColors.forEach((color) => {
      expect(screen.getByTestId(`color-${color}`)).toBeInTheDocument();
    });
  });

  it('shows check icon for current color', () => {
    render(
      <RecentColors
        recentColors={mockRecentColors}
        currentColor={mockCurrentColor}
        onColorSelect={mockOnColorSelect}
      />
    );

    expect(
      screen.getByTestId(`check-icon-${mockCurrentColor}`)
    ).toBeInTheDocument();
  });

  it('calls onColorSelect when a color is clicked', async () => {
    const user = userEvent.setup();
    render(
      <RecentColors
        recentColors={mockRecentColors}
        currentColor={mockCurrentColor}
        onColorSelect={mockOnColorSelect}
      />
    );

    await user.click(screen.getByTestId(`color-${mockRecentColors[1]}`));
    expect(mockOnColorSelect).toHaveBeenCalledWith(mockRecentColors[1]);
  });

  it('shows "No recent colors" message when recentColors is empty', () => {
    render(
      <RecentColors
        recentColors={[]}
        currentColor=""
        onColorSelect={mockOnColorSelect}
      />
    );

    expect(screen.getByText('No recent colors')).toBeInTheDocument();
  });
});
