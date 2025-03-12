import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AIColorExtractor } from '../AIColorExtractor';

// Mock dos hooks
const mockExtractColors = jest.fn();
jest.mock('@hooks/AI/useExtractColors', () => ({
  useExtractColors: () => ({
    mutate: mockExtractColors,
    isPending: false,
  }),
}));

const mockToast = jest.fn();
jest.mock('@hooks/General/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}));

describe('AIColorExtractor', () => {
  const mockOnColorsExtracted = jest.fn();
  const mockImageUrl = 'https://example.com/image.jpg';

  beforeEach(() => {
    jest.clearAllMocks();
    mockExtractColors.mockImplementation((_, { onSuccess }) =>
      onSuccess({ colors: ['#FF0000', '#00FF00', '#0000FF'] })
    );
  });

  it('renders correctly', () => {
    render(
      <AIColorExtractor
        imageUrl={mockImageUrl}
        onColorsExtracted={mockOnColorsExtracted}
      />
    );

    expect(
      screen.getByRole('button', { name: /extract colors from image/i })
    ).toBeInTheDocument();
  });

  it('calls onColorsExtracted with extracted colors on success', async () => {
    const user = userEvent.setup();
    render(
      <AIColorExtractor
        imageUrl={mockImageUrl}
        onColorsExtracted={mockOnColorsExtracted}
      />
    );

    await user.click(
      screen.getByRole('button', { name: /extract colors from image/i })
    );

    expect(mockOnColorsExtracted).toHaveBeenCalledWith([
      '#FF0000',
      '#00FF00',
      '#0000FF',
    ]);
  });

  it('shows error toast when no image URL is provided', async () => {
    const user = userEvent.setup();

    render(
      <AIColorExtractor imageUrl="" onColorsExtracted={mockOnColorsExtracted} />
    );

    await user.click(
      screen.getByRole('button', { name: /extract colors from image/i })
    );

    expect(mockToast).toHaveBeenCalledWith({
      title: 'No image selected',
      description: 'Please select an image first',
      variant: 'destructive',
    });
    expect(mockOnColorsExtracted).not.toHaveBeenCalled();
  });
});
