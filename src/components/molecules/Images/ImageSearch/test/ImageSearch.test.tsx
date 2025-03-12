import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { ImageSearch } from '../ImageSearch';

jest.mock('@hooks/General/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

jest.mock('@hooks/Images/useSearchImages', () => ({
  useSearchImages: () => ({
    mutate: jest.fn(),
    isPending: false,
  }),
}));

describe('ImageSearch', () => {
  it('renders search input and button', () => {
    render(<ImageSearch onSelectImage={jest.fn()} />);

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});
