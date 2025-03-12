import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { ImageCard } from '../ImageCard';

jest.mock('@hooks/General/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

jest.mock('@providers/DataProvider/DataProvider', () => ({
  useData: () => ({
    groups: [],
    tags: [],
    images: [],
    setImages: jest.fn(),
  }),
}));

const mockImage = {
  id: '1',
  title: 'Test Image',
  url: 'https://example.com/image.jpg',
  groupId: '1',
  tagIds: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  comment: 'Test comment',
};

describe('ImageCard', () => {
  it('renders image card with title and comment', () => {
    render(<ImageCard image={mockImage} />);

    expect(screen.getByText('Test Image')).toBeInTheDocument();
    expect(screen.getByTestId('message-square')).toBeInTheDocument();
  });
});
