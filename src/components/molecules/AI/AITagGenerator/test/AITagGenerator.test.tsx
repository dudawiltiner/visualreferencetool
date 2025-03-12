import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AITagGenerator } from '../AITagGenerator';

// Mock dos hooks
const mockGenerateTags = jest.fn();
jest.mock('@hooks/AI/useGenerateTags', () => ({
  useGenerateTags: () => ({
    mutate: mockGenerateTags,
    isPending: false,
  }),
}));

const mockToast = jest.fn();
jest.mock('@hooks/General/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}));

describe('AITagGenerator', () => {
  const mockOnTagsGenerated = jest.fn();
  const mockImageUrl = 'https://example.com/image.jpg';

  beforeEach(() => {
    jest.clearAllMocks();
    mockGenerateTags.mockImplementation((_, { onSuccess }) =>
      onSuccess({ tags: ['tag1', 'tag2', 'tag3'], isMock: false })
    );
  });

  it('renders correctly', () => {
    render(
      <AITagGenerator
        imageUrl={mockImageUrl}
        onTagsGenerated={mockOnTagsGenerated}
      />
    );

    expect(
      screen.getByRole('button', { name: /generate tags from image/i })
    ).toBeInTheDocument();
  });

  it('calls onTagsGenerated with generated tags on success', async () => {
    const user = userEvent.setup();
    render(
      <AITagGenerator
        imageUrl={mockImageUrl}
        onTagsGenerated={mockOnTagsGenerated}
      />
    );

    await user.click(
      screen.getByRole('button', { name: /generate tags from image/i })
    );

    expect(mockOnTagsGenerated).toHaveBeenCalledWith(['tag1', 'tag2', 'tag3']);
  });

  it('shows warning toast when using mock data', async () => {
    const user = userEvent.setup();
    mockGenerateTags.mockImplementation((_, { onSuccess }) =>
      onSuccess({ tags: ['mock1', 'mock2'], isMock: true })
    );

    render(
      <AITagGenerator
        imageUrl={mockImageUrl}
        onTagsGenerated={mockOnTagsGenerated}
      />
    );

    await user.click(
      screen.getByRole('button', { name: /generate tags from image/i })
    );

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Using simulated tags',
      description:
        'Add OPENAI_API_KEY to environment variables for AI-generated tags',
      variant: 'destructive',
    });
    expect(mockOnTagsGenerated).toHaveBeenCalledWith(['mock1', 'mock2']);
  });

  it('shows error toast when no image URL is provided', async () => {
    const user = userEvent.setup();

    render(
      <AITagGenerator imageUrl="" onTagsGenerated={mockOnTagsGenerated} />
    );

    await user.click(
      screen.getByRole('button', { name: /generate tags from image/i })
    );

    expect(mockToast).toHaveBeenCalledWith({
      title: 'No image selected',
      description: 'Please select an image first',
      variant: 'destructive',
    });
    expect(mockOnTagsGenerated).not.toHaveBeenCalled();
  });
});
